# Mermaid Process Flow — Unified Order Fulfilment & Exception Handling System

This file contains a Mermaid sequence diagram for the standard order lifecycle and exception handling flows. Exception handling steps are labelled with "[EXCEPTION]".

```mermaid
sequenceDiagram
    participant Customer
    participant Channel
    participant OrderIntake as "Order Intake"
    participant Validate as "Validation/Enrichment"
    participant Duplicate as "Duplicate Detector"
    participant Inventory as "Inventory/BOM/ERP"
    participant WMS
    participant Courier
    participant Exception as "Exception Engine"
    participant SLA as "SLA Engine"
    participant Assign as "Assignment/Queue"
    participant Owner
    participant Reporting as "Reporting/Audit"
    participant Payment as "Payment Service"

    Customer->>Channel: Place Order
    Channel->>OrderIntake: Submit canonical order
    OrderIntake->>Validate: Validate fields & enrich

    alt validation OK
        OrderIntake->>Duplicate: Check duplicates
        Duplicate-->>OrderIntake: Not duplicate
        OrderIntake->>Inventory: Reserve inventory / run BOM comparator
        Inventory-->>OrderIntake: Reservation OK
        OrderIntake->>WMS: Send pick/pack request
        WMS-->>OrderIntake: Picked/Packed
        OrderIntake->>Courier: Create shipment (tracking)
        Courier-->>OrderIntake: Tracking number
        Courier-->>OrderIntake: Tracking updates
        OrderIntake->>Reporting: Log events & metrics
        Courier->>Customer: Deliver
    else validation FAIL
        Validate->>Exception: [EXCEPTION] Missing/Invalid Data
        Exception->>SLA: Start SLA (Missing customer info)
        SLA->>Assign: Route to Customer Support queue
        Assign->>Owner: Notify / assign
        Owner->>Exception: Take ownership / resolve (update customer info)
        Owner->>OrderIntake: Submit corrected order
        OrderIntake->>Validate: Re-validate
    end

    alt duplicate detected
        Duplicate->>Exception: [EXCEPTION] Duplicate Order
        Exception->>SLA: Start SLA (Duplicate)
        Exception->>Assign: Route to Support/Operations
        Assign->>Owner: Claim/resolve (merge/cancel)
        Owner->>OrderIntake: Apply merge/cancel action
    end

    alt inventory/BOM mismatch
        Inventory->>Exception: [EXCEPTION] Inventory/BOM Mismatch
        Exception->>SLA: Start SLA (Inventory mismatch)
        Exception->>Assign: Route to Production Planner & Procurement & Design
        Assign->>Owner: Notify with comparator report and suggested alternates
        Owner->>Exception: Approve alternate / trigger procurement / update BOM
        Owner->>Inventory: Update reservation / place PO
        Inventory-->>OrderIntake: Reservation updated
    end

    alt courier delay / tracking issue
        Courier->>Exception: [EXCEPTION] Courier Delay/Tracking Issue
        Exception->>SLA: Start SLA (Courier)
        Exception->>Assign: Route to Courier Coordinator
        Assign->>Owner: Investigate / re-query
        Owner->>Courier: Reroute / escalate to courier partner
        Courier-->>Exception: Update status
    end

    alt payment / COD failure
        Payment->>Exception: [EXCEPTION] Payment/COD Failure
        Exception->>SLA: Start SLA (Payment)
        Exception->>Assign: Route to Finance & Support
        Assign->>Owner: Attempt verification / request customer reconfirmation
        Owner->>Payment: Retry or initiate refund/hold
    end

    Note over Exception,SLA,Assign: All exception actions are recorded in activity timeline and immutable audit logs
    Note over SLA: SLA pause/resume logic applies for external-wait states

    Owner->>Exception: Mark resolved + add resolution notes
    Exception->>SLA: Stop SLA timer and record resolution time
    Exception->>OrderIntake: If needed, propagate update to ERP/WMS/Courier
    OrderIntake->>Reporting: Finalize event logs and metrics
```
