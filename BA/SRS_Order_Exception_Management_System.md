# Software Requirements Specification (SRS) for Order Exception Management System

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for an Order Exception Management System. The primary goal is to streamline the identification, classification, assignment, and resolution of exceptions that occur during the order fulfillment lifecycle, thereby improving operational efficiency, reducing manual effort, and enhancing customer satisfaction.

### 1.2 Scope
The system will manage order exceptions from various intake channels, integrate with external systems like ERP and Courier Tracking, and provide tools for exception assignment, SLA management, and comprehensive reporting. It will support specific user roles with role-based access control.

**Out of Scope:**
*   Payment gateway integration
*   Creation of courier shipping labels
*   Full returns management workflow (only exception flagging, assignment, and SLA handling are in scope)

### 1.3 Definitions, Acronyms, and Abbreviations
*   **SLA:** Service Level Agreement
*   **ERP:** Enterprise Resource Planning
*   **COD:** Cash on Delivery
*   **EDD:** Estimated Delivery Date
*   **UI:** User Interface
*   **SKU:** Stock Keeping Unit
*   **CSV:** Comma Separated Values

### 1.4 References
*   User-provided clarification responses (December 1, 2025)

## 2. Overall Description

### 2.1 Product Perspective
The Order Exception Management System will be a standalone application that integrates with existing order intake channels and external systems (ERP, Courier Tracking API). It will act as a central hub for managing order-related issues, providing visibility and control over the exception resolution process.

### 2.2 Product Functions
The system will provide the following key functions:
*   Consolidate orders from multiple source channels.
*   Detect and classify various types of order exceptions.
*   Integrate with ERP for inventory, product, and order status synchronization.
*   Integrate with Courier Tracking APIs for shipment status updates.
*   Manage SLAs for different exception types, including configurable timers and escalation.
*   Automate exception assignment based on predefined rules.
*   Enable manual reassignment of exceptions.
*   Provide dashboards and reports for monitoring exception status, performance, and trends.
*   Support role-based access control for different user types.
*   Maintain a structured audit trail for all actions.

### 2.3 User Characteristics
The system will cater to the following user roles:
*   **Customer Support Agent:** Primarily responsible for resolving customer-facing exceptions.
*   **Warehouse Supervisor:** Manages inventory-related and fulfillment exceptions.
*   **ERP Administrator:** Oversees ERP integration and data synchronization.
*   **Courier Management Coordinator:** Handles courier-related exceptions and tracking.
*   **Operations Manager:** Monitors overall system performance, SLA compliance, and reporting.

Users are expected to have basic computer literacy and familiarity with order fulfillment processes.

### 2.4 Constraints
*   **Integration:** Mandatory integrations with ERP and Courier Tracking API.
*   **Security:** Role-based access control is mandatory.
*   **Data Export:** Data export to CSV must be supported.

### 2.5 Assumptions and Dependencies
*   Existing order intake channels (Website, Mobile App, WhatsApp, Marketplaces, Manual Excel) will be capable of pushing order data to a unified Order Intake Service.
*   External systems (ERP, Courier Tracking API) will provide necessary APIs for integration.
*   The unified Order Intake Service will be available and functional.

## 3. Specific Requirements

### 3.1 Functional Requirements

#### 3.1.1 Order Intake and Consolidation
*   **FR1.1:** The system SHALL receive order data from a unified Order Intake Service.
*   **FR1.2:** The system SHALL support order consolidation from the following channels:
    *   Website checkout system
    *   Mobile App
    *   WhatsApp Business Bot
    *   Marketplace Platforms (Amazon, Flipkart)
    *   Manual Excel Upload by operations team

#### 3.1.2 Exception Detection and Classification
*   **FR2.1:** The system SHALL automatically detect and classify exceptions at the time of order intake.
*   **FR2.2:** The system SHALL automatically detect and classify exceptions at the time of order fulfillment stage transition.
*   **FR2.3:** The system SHALL automatically detect and classify exceptions at the time of courier status update.
*   **FR2.4:** The system SHALL support the following exception categories:
    *   Missing customer details
    *   Duplicate orders
    *   Inventory mismatch
    *   Courier API delay or downtime
    *   Order modification request after confirmation
    *   COD verification failure
    *   Partial shipment or split order case
    *   Refund or replacement claim not completed

#### 3.1.3 External Integrations
*   **FR3.1:** The system SHALL integrate with an ERP system for:
    *   Inventory synchronization
    *   Product validation
    *   Order status updates
*   **FR3.2:** The system SHALL integrate with a Courier Tracking API for:
    *   Shipment status updates
    *   Tracking number retrieval
    *   Estimated Delivery Date (EDD) retrieval
    *   Delivery confirmation
*   **FR3.3:** Integrations with ERP and Courier Tracking API SHALL be bi-directional where feasible.

#### 3.1.4 SLA Management
*   **FR4.1:** The system SHALL define default SLA timers for each exception type.
*   **FR4.2:** The system SHALL allow configuration of SLA timers per client brand.
*   **FR4.3:** The system SHALL display a visual timer countdown for each exception's SLA.
*   **FR4.4:** The system SHALL trigger escalations upon SLA breach.

#### 3.1.5 User Roles and Access Control
*   **FR5.1:** The system SHALL support the following user roles:
    *   Customer Support Agent
    *   Warehouse Supervisor
    *   ERP Administrator
    *   Courier Management Coordinator
    *   Operations Manager
*   **FR5.2:** The system SHALL implement role-based access control, allowing configurable permissions for each role.

#### 3.1.6 Exception Assignment
*   **FR6.1:** The system SHALL auto-assign exceptions based on the following rules:
    *   Exception category
    *   Channel source
    *   SKU/Warehouse mapping
    *   Client brand service rules
    *   SLA priority
*   **FR6.2:** Users SHALL be able to manually reassign exceptions.

#### 3.1.7 Dashboard and Reporting
*   **FR7.1:** The system SHALL provide a dashboard displaying:
    *   Exception volume by type
    *   SLA status (open, breached, resolved)
    *   Order fulfillment stage progress
    *   Courier delivery status
    *   Channel-wise order volume
*   **FR7.2:** The system SHALL provide reporting on resolution performance trends.
*   **FR7.3:** The system SHALL support data export to CSV format for all reports.

#### 3.1.8 User Interface (UI)
*   **FR8.1:** The system SHALL provide an "Exception list view" with filtering capabilities.
*   **FR8.2:** The system SHALL provide an "Exception detail view" including an activity log and internal chat functionality.
*   **FR8.3:** The system SHALL include a "Dashboard layout" for overview.
*   **FR8.4:** The system SHALL include an "Order details panel" for quick access to order information.
*   **FR8.5:** The system SHALL display an "SLA timer" prominently.
*   **FR8.6:** The system SHALL include an "Assignment widget" for managing exception ownership.
*   **FR8.7:** The system SHALL display "Flags for exception category and breach" for quick identification.

#### 3.1.9 Audit Trail
*   **FR9.1:** The system SHALL maintain a structured audit trail for all actions and changes within the system.

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance
*   **NFR1.1:** The system SHALL process order intake and exception detection with minimal latency to ensure real-time identification of issues.
*   **NFR1.2:** Dashboards and reports SHALL load within acceptable timeframes (e.g., 5 seconds) even with large datasets.

#### 3.2.2 Security
*   **NFR2.1:** The system SHALL enforce role-based access control to ensure users only access authorized functionalities and data.
*   **NFR2.2:** All sensitive data (e.g., customer details, API keys) SHALL be encrypted both in transit and at rest.
*   **NFR2.3:** The system SHALL be protected against common web vulnerabilities (e.g., SQL injection, XSS).

#### 3.2.3 Usability
*   **NFR3.1:** The UI SHALL be intuitive and easy to navigate for all defined user roles.
*   **NFR3.2:** The system SHALL provide clear visual indicators for SLA status and exception priority.
*   **NFR3.3:** The system SHALL provide clear feedback to users on actions performed.

#### 3.2.4 Reliability
*   **NFR4.1:** The system SHALL be highly available, minimizing downtime to ensure continuous operation.
*   **NFR4.2:** The system SHALL handle integration failures gracefully, with appropriate logging and retry mechanisms.

#### 3.2.5 Maintainability
*   **NFR5.1:** The system SHALL be designed with modular components to facilitate future enhancements and maintenance.
*   **NFR5.2:** The codebase SHALL adhere to established coding standards and best practices.

#### 3.2.6 Scalability
*   **NFR6.1:** The system SHALL be able to scale to accommodate increasing volumes of orders and exceptions without significant degradation in performance.

#### 3.2.7 Data Integrity
*   **NFR7.1:** The system SHALL ensure the accuracy and consistency of all order and exception data.
*   **NFR7.2:** The system SHALL prevent duplicate orders from being processed as distinct exceptions.

#### 3.2.8 Compliance
*   **NFR8.1:** The system SHALL comply with relevant data protection regulations (e.g., GDPR, CCPA) regarding customer data.

## Personas

| Persona | Short summary | Primary system interaction |
|---|---:|---|
| Procurement Manager | Owns purchasing decisions, manages supplier contracts, cost and lead-time optimization. | Uses the system to review BOM discrepancies, approve alternate parts, and track supplier exceptions. |
| Design / BOM Engineer | Maintains bill-of-materials (BOM), assigns part references, ensures design intent. | Uploads/edits BOMs, reviews comparison reports, resolves part mismatches and change requests. |
| Production Planner / MRP Specialist | Plans production schedules and material requirements; needs accurate BOMs to avoid downtime. | Monitors exceptions that affect production, converts BOM changes into MRP inputs, and escalates critical shortages. |
| Quality & Compliance Manager | Ensures parts meet quality/spec requirements and regulatory constraints. | Reviews supplier deviations, approves or rejects alternate parts based on quality/certification data in exceptions. |
| IT / Systems Administrator | Maintains and configures the Order Exception Management and BOM tools; integrates with ERP/PLM. | Configures data sources, manages user roles/permissions, and handles system integrations and alerts. |

## Stakeholder Responsibility Matrix (Responsibility, Pain Points, Needs)

| Persona | Responsibility | Pain Points | Needs |
|---|---|---|---|
| Procurement Manager | - Approve purchases and supplier substitutions<br>- Negotiate lead times and costs<br>- Ensure supplier compliance | - Late or incorrect BOM info causing expedited orders<br>- Lack of clear substitution rationale<br>- Unexpected cost or lead-time changes | - Clear, auditable exception records<br>- Fast visibility into approved alternates and cost impact<br>- Integration with supplier/ERP data for real-time status |
| Design / BOM Engineer | - Maintain accurate BOMs and revisions<br>- Validate part fit, form, function<br>- Address engineering change requests (ECRs) | - Time-consuming manual reconciliation of BOMs<br>- Ambiguous mismatch reasons from suppliers or manufacturing<br>- Version-control confusion | - Easy diff reports highlighting root cause (changed attributes)<br>- Traceable change history and rollback capability<br>- Notifications for impacts on downstream processes |
| Production Planner / MRP Specialist | - Translate BOM to production schedules and material buys<br>- Manage inventory buffers and procurement triggers | - Production disruptions from last-minute exceptions<br>- Poor visibility on expected resolution times<br>- Mismatched part numbers between systems | - Priority tagging for exceptions affecting scheduled builds<br>- ETA on resolution and alternate-part acceptance status<br>- Exportable updates for MRP/ERP consumption |
| Quality & Compliance Manager | - Approve/reject alternates on quality/standards grounds<br>- Maintain certificate and test-report traceability | - Insufficient supplier documentation for alternates<br>- Risk of non-compliant parts entering production | - Access to supplier certifications and deviation rationale within the exception record<br>- Ability to quarantine or flag suspect parts quickly |
| IT / Systems Administrator | - Maintain system uptime, integrations, and user access<br>- Ensure data integrity across BOM, PLM, ERP | - Complex integrations and mapping between data models<br>- Alert fatigue from poorly tuned rule sets | - Clear audit logs and error reports<br>- Simple mapping tools and configuration UI for integrations<br>- Role-based access controls and monitoring dashboards |

# Use Cases — Unified Order Fulfilment & Exception Handling System

| Use Case ID | Name | Short description | Trigger | Actor(s) | Expected outcome |
|---|---|---|---|---|---|
| UC-01 | Intake — Website Order Capture | Ingest website checkout order into unified intake. | Customer completes website checkout. | Customer, Website Checkout, Order Intake Service | Order recorded, validated, queued for processing; confirmation sent. |
| UC-02 | Intake — Mobile App Order Capture | Ingest mobile app order into unified intake. | Customer confirms order in mobile app. | Customer, Mobile App, Order Intake Service | Order recorded, validated; confirmation sent. |
| UC-03 | Intake — WhatsApp/Chat Order Capture | Ingest orders submitted via WhatsApp/chat bot. | Customer submits order via chat. | Customer, Chat Bot, Order Intake Service | Order recorded with channel metadata; confirmation sent; missing fields flagged. |
| UC-04 | Intake — Marketplace Order Sync | Import orders from external marketplaces. | Marketplace webhook or scheduled sync. | Marketplace Connector, Order Intake Service | Orders imported with marketplace IDs; duplicates handled; status synced. |
| UC-05 | Intake — Manual Upload (CSV/Excel) | Bulk ingest orders from uploaded CSV/Excel files. | Operations uploads file. | Operations User, Manual Uploader, Order Intake Service | Valid rows imported; row-level errors returned; orders queued. |
| UC-06 | Order Validation & Enrichment | Validate schema, normalize address, enrich customer and SKU data. | New order enters intake. | Order Intake Service, Enrichment Services, ERP Connector | Order validated or validation exception created; enrichment fields populated. |
| UC-07 | Duplicate Order Detection | Identify potential duplicate orders and flag for review. | New order matches existing by keys. | Exception Engine, Order Intake Service | Duplicate exception created; operator alerted with merge/cancel recommendation. |
| UC-08 | Inventory Check & Reservation | Verify availability and reserve stock in ERP/WMS. | Order validated and accepted. | ERP, WMS, Order Intake Service | Inventory reserved or backorder flagged; inventory exception created if mismatch. |
| UC-09 | Automated Exception — Missing Data | Auto-detect missing/invalid customer or payment data. | Validation finds missing/invalid fields. | Exception Engine | Missing-data exception created; SLA started; owner assigned. |
| UC-10 | Automated Exception — Inventory Mismatch | Detect mismatch between ordered items and inventory/BOM. | Inventory check or BOM comparator flags discrepancy. | Exception Engine, BOM Comparator, ERP | Inventory-mismatch exception created; resolution workflow started. |
| UC-11 | Automated Exception — Courier Issue | Detect courier delays, missing tracking, or delivery failure. | Courier API reports delay/error or failure. | Courier Connector, Exception Engine | Courier exception created; tracking updated; coordinator notified; SLA started. |
| UC-12 | Automated Exception — Payment Failure | Detect payment gateway or COD verification failures. | Payment service returns failure. | Payment Service, Exception Engine | Payment exception created; order placed on hold; customer notified. |
| UC-13 | SLA Assignment & Routing | Assign SLA timers and route exceptions based on rules. | Exception created or updated. | SLA Engine, Rule Engine | SLA timer set; exception auto-assigned per routing rules; notification sent. |
| UC-14 | Auto-assignment & Escalation | Automatically assign exceptions and escalate on SLA breach. | SLA breach or escalation condition met. | Assignment Service, SLA Engine | Owner set; escalation actions executed and notifications sent. |
| UC-15 | Manual Assignment & Reassignment | Allow users to claim or reassign exceptions manually. | User takes or reassigns exception in UI. | Support Agent, Warehouse Supervisor, Operations Manager | Owner updated; activity log entry created; notifications sent. |
| UC-16 | Internal Collaboration | Internal comments, chat, and attachments for exception resolution. | Specialist needs clarification or collaboration. | Support Agent, SMEs, Exception Engine | Messages and attachments stored on activity timeline; stakeholders notified. |
| UC-17 | External Notifications | Send updates/requests to customers, suppliers, or couriers. | Exception requires external input or status change. | Notification Service, Customer, Supplier, Courier | External messages sent; responses recorded; SLA may pause/resume. |
| UC-18 | Warehouse Integration — Pick/Pack | Generate pick/pack orders and receive confirmations/adjustments. | Order ready for fulfillment. | WMS, Warehouse System, Warehouse Supervisor | Pick tickets issued; confirmations update order status; discrepancies create exceptions. |
| UC-19 | Courier Integration — Ship & Track | Create shipments, obtain labels, ingest tracking updates. | Order picked/packed and ready for dispatch. | Courier Connector, Warehouse System | Shipment created; tracking number recorded; tracking updates flow to order. |
| UC-20 | Order Modification | Process address/quantity/cancellation requests before shipment. | Customer requests change pre-shipment. | Customer, Support Agent, ERP, WMS | Order updated; inventory adjusted; change logged and propagated. |
| UC-21 | Refund & Replacement | Authorize/process refunds, replacements, and RMAs. | Customer requests refund/replacement or exception triggers refund. | Customer, Support Agent, Finance System, Warehouse | Refund processed; replacement/RMA created; statuses logged. |
| UC-22 | Quality Documentation Attachment | Attach supplier certificates or QA reports to exception records. | Alternate part or deviation requires QA evidence. | Quality Manager, Supplier, Procurement Manager | Certificates attached; QA approval/rejection recorded; exception updated. |
| UC-23 | Dashboards & Reporting | Provide dashboards and scheduled/ad-hoc reports on KPIs and trends. | User opens dashboard or scheduled report time arrives. | Operations Manager, Reporting Engine | Dashboard populated with filters; reports exportable to CSV; insights available. |
| UC-24 | Audit Trail & Logs | Record immutable audit logs for orders, exceptions, and system changes. | Any action or system event. | System, All Users, IT Admin | Audit entries recorded with timestamp, user, and context; exportable. |
| UC-25 | Admin — Roles & Permissions | Manage RBAC, roles, and user permissions. | Admin requests role or permission change. | IT/Admin | Roles/permissions updated; changes logged; access enforced. |
| UC-26 | Admin — Integrations & Mappings | Configure connectors and field mappings for external systems. | New integration or mapping change requested. | IT Admin, Integration Engineer | Connectors configured and tested; mappings saved; errors logged. |
| UC-27 | Admin — SLA & Routing Rules | Configure SLA values, priorities, and auto-routing logic. | Business requests SLA or routing change. | Operations Manager, Admin | Rules updated and applied to new exceptions; changes audited. |
| UC-28 | Data Export & Sync | Export orders/exceptions to CSV or push updates to external systems. | User requests export or integration sync triggers. | Operations User, ERP, Reporting Engine | Data exported/synced; results logged with success/failure. |
| UC-29 | Reopen Resolved Exceptions | Reopen exceptions when new evidence or follow-up appears. | New information received or customer follow-up. | Support Agent, Operations Manager | Exception reopened; activity recorded; SLA/assignment recalculated. |
| UC-30 | System Monitoring & Alerting | Monitor connector health, error rates, and alert IT/ops on anomalies. | Connector failures or abnormal error rates detected. | Monitoring Service, IT Admin, Operations Manager | Alerts created with context; incidents created for severe issues. |

## Persona-level Goals, Frustrations, and Decision Triggers

| Persona | Goals | Frustrations | Decision Triggers |
|---|---|---|---|
| Procurement Manager | - Minimize cost and lead time<br>- Maintain supplier reliability<br>- Keep procurement compliant and auditable | - Lack of timely exception info<br>- Surprises in cost/availability after orders placed | - Accept alternate when cost+lead-time improvement confirmed and quality cleared<br>- Escalate when resolution exceeds agreed SLA or impacts critical orders |
| Design / BOM Engineer | - Keep BOMs correct and current<br>- Reduce rework and ECO cycles<br>- Maintain single source of truth for part data | - Manual reconciliation effort<br>- Unclear cause for discrepancies across systems | - Initiate ECR when alternate affects form/fit/function<br>- Approve minor alternates when they meet spec and don’t require redesign |
| Production Planner / MRP Specialist | - Keep production on schedule<br>- Avoid stockouts and emergency buys<br>- Sync BOM changes to MRP quickly | - Last-minute exceptions that break plans<br>- No predictable ETA for part resolution | - Trigger expedited procurement when exception unresolved and build is impacted<br>- Hold production change until alternate formally accepted or approved |
| Quality & Compliance Manager | - Ensure only compliant parts are used<br>- Maintain audit-ready records of deviations | - Insufficient traceability or supplier docs<br>- Risk-driven interruptions to production | - Reject alternates without required certificates or test evidence<br>- Temporarily quarantine part families on failed quality checks |
| IT / Systems Administrator | - Ensure reliable integrations and secure access<br>- Keep system maintainable with low manual support | - Frequent schema mismatches and manual mapping work<br>- Excessive alerts without context | - Apply mapping/config changes when error rates rise or data mismatches recur<br>- Enforce permission changes when audits identify gaps |


## Functional Requirements (Main Deliverable)

Omni-channel order intake

FR-001: The system shall receive and ingest orders from a website checkout channel and persist a canonical order record within 5 seconds of receipt.
FR-002: The system shall receive and ingest orders from a mobile app channel and persist a canonical order record within 5 seconds of receipt.
FR-003: The system shall receive and ingest orders submitted via WhatsApp or chat-bot channels and persist channel metadata with the canonical order record.
FR-004: The system shall import orders from marketplace platforms (e.g., Amazon, Flipkart) via webhook or scheduled sync and deduplicate using marketplace ID + order signature.
FR-005: The system shall accept bulk order uploads in CSV or Excel format, validate each row against the order schema, and return a row-level validation report identifying errors and successful imports.
FR-006: The system shall normalize and store channel provenance metadata (source channel, channel message id, marketplace id) for every ingested order.
FR-007: The system shall acknowledge successful intake to the originating channel (HTTP response, webhook ack or message) within the channel's expected protocol.
Order processing workflow

FR-008: The system shall validate required order fields (customer name, contact, address, items, quantities, payment method) and mark orders that fail validation as exceptions with a defined category.
FR-009: The system shall perform address normalization and geocoding enrichment for shipping addresses and mark failures as exceptions.
FR-010: The system shall enrich incoming orders with SKU master data (description, unit measures, supplier id) by querying the configured product/ERP service, logging enrichment failures as exceptions.
FR-011: The system shall detect potential duplicate orders by configurable matching rules (e.g., customer id, phone, items, timestamp) and create a duplicate-order exception with suggested actions (merge, cancel).
FR-012: The system shall perform an availability check against ERP/WMS for each SKU and reserve quantity for accepted orders; if reservation fails, create an inventory exception and set reservation state.
FR-013: The system shall expose an API and UI action to release, modify, or confirm reserved inventory and record the action in the audit trail.
FR-014: The system shall allow authorized users to accept, edit, or cancel orders via the UI/API and propagate changes to connected systems according to configured integration rules.
FR-015: The system shall support order state transitions (Received → Validated → Reserved → Picked → Packed → Shipped → Delivered/Closed) and enforce permitted transitions.
Exception detection engine

FR-016: The system shall automatically create an exception record whenever validation, enrichment, duplicate detection, inventory reservation, or external integration returns a failure or mismatch.
FR-017: The system shall classify exceptions into configurable categories (e.g., Missing Data, Duplicate Order, Inventory Mismatch, Courier Issue, Payment Failure, BOM Mismatch) and store the classification on the exception record.
FR-018: The system shall attach diagnostic metadata to each exception (source event, payload snapshot, timestamp, confidence score) to enable root-cause analysis.
FR-019: The system shall run BOM/component comparison logic for orders containing multi-part assemblies and create a BOM-mismatch exception when part numbers, quantities, or attributes differ beyond configured tolerances.
FR-020: The system shall detect courier-related exceptions by ingesting courier API statuses (delay, failed delivery, undelivered, unknown tracking) and create courier exceptions with tracking context.
FR-021: The system shall detect payment-related exceptions (gateway errors, COD verification failures) and place the order on hold while creating a payment exception.
FR-022: The system shall allow configurable business rules (boolean and threshold rules) to mark events as exceptions and evaluate those rules for every order event.
Exception routing & SLA rules

FR-023: The system shall assign SLA timers to exceptions based on exception category and client-brand configuration and record SLA start time when the exception is created.
FR-024: The system shall auto-route exceptions to queues, teams, or roles using configurable routing rules (category, channel, SKU, warehouse, priority) and record the routed destination.
FR-025: The system shall auto-assign individual exceptions to users using configurable logic (round-robin, least-load, skill-match) and allow fallback to team queues if no assignee is available.
FR-026: The system shall provide escalation actions when SLA thresholds are reached (notify supervisor, change priority, reassign) and log escalation events.
FR-027: The system shall display SLA countdowns and status (on-time, at-risk, breached) in the UI and include SLA state in API responses for exception records.
FR-028: The system shall allow manual override of auto-assignment and routing by authorized users and record the override action and reason in the audit trail.
FR-029: The system shall support pausing and resuming SLA timers based on defined events (awaiting customer response, awaiting supplier doc) and log the reason and timestamps.
Internal communication & collaboration

FR-030: The system shall provide an internal activity timeline per exception that records comments, status changes, assignments, file attachments, and system events in chronological order.
FR-031: The system shall provide an in-record chat/comment capability with basic threading and mention support and persist all messages in the audit trail.
FR-032: The system shall allow users to attach files (PDF, images, CSV) to exception records, store attachments securely, and make them available to authorized roles for review.
FR-033: The system shall support templated, auditable internal notifications and alerts (email/Slack/in-app) to stakeholders when exception status, assignment, or SLA changes.
FR-034: The system shall record all external communications (messages sent to customers/suppliers/couriers and replies) with timestamps and link them to the related exception.
Integrations (ERP & courier)

FR-035: The system shall integrate with ERP systems to query SKU master data, update inventory reservations, and push order status changes using configurable field mappings and transformation rules.
FR-036: The system shall ingest courier tracking updates (status changes, EDD, delivery confirmations) from courier APIs or webhooks and correlate updates to orders by tracking number.
FR-037: The system shall support configurable retry and backoff strategies for transient integration failures and log each integration attempt and outcome.
FR-038: The system shall export resolved exception outcomes and approved alternates to the ERP or downstream systems via API or configurable file export for reconciliation.
FR-039: The system shall NOT mandate creation of courier shipping labels; instead it shall consume shipping/tracking information from external courier/WMS systems and reflect status updates.
Dashboards & reporting

FR-040: The system shall provide role-based dashboards that show exception volume by category, SLA compliance, average time-to-resolve, and top root causes, refreshable on demand.
FR-041: The system shall provide filtered, drillable exception lists and allow users to save filters and views for reuse.
FR-042: The system shall generate scheduled and ad-hoc reports (CSV export) for exception metrics, SLA performance, and user/team productivity and support export to CSV.
FR-043: The system shall support trend reports over time (daily/weekly/monthly) for key metrics such as exception count, breach rate, and mean time to resolution.
Audit & compliance

FR-044: The system shall maintain an immutable audit trail for all system actions (create/update/delete), assignment changes, SLA events, and external messages with timestamp, actor, and context.
FR-045: The system shall provide exportable audit logs and activity reports for compliance reviews and support filtering by date range, user, and event type.
FR-046: The system shall store sensitive data according to configured policies (masking or encryption at rest) and ensure that access to sensitive fields is controlled via role-based permissions.
FR-047: The system shall record and retain exception evidence (payload snapshots, attached documents, decision rationale) for a configurable retention period and support retrieval for audits.
Configuration & administration

FR-048: The system shall provide an administration UI to manage users, roles, and role-based permissions and log all admin changes to the audit trail.
FR-049: The system shall provide configuration screens to define and modify SLA values, escalation rules, and routing logic and apply changes to new exceptions immediately while logging the change.
FR-050: The system shall provide connector configuration pages to add, test, and manage ERP, WMS, and courier connectors, including field mappings, credential management, and endpoint tests.
FR-051: The system shall allow administrators to define and test exception-detection rules (conditions, thresholds, and priority) via a rules editor and provide a test harness to run rules against sample payloads.
FR-052: The system shall provide export and import capability for configuration bundles (SLA settings, routing rules, field mappings) to enable staging to production workflows.
FR-053: The system shall enforce role-based access control for configuration and administration features, permitting only authorized admin roles to change integrations, rules, or retention policies.


## Non-Functional Requirements (NFRs)
NFR-001: The system shall process and persist a single-channel order intake request (website, mobile, or chat) within 2 seconds for 95% of requests and within 5 seconds for 99.9% of requests under normal production load.

NFR-002: The system shall support sustained throughput of 2,000 order intake requests per minute with linear scaling to meet higher traffic by adding compute nodes, and shall document a validated throughput test report.

NFR-003: The system shall ingest and validate bulk CSV/Excel uploads of up to 50,000 rows and return a row-level validation report within 10 minutes for files of that size.

NFR-004: The system shall detect and create exception records for incoming events (validation, inventory mismatch, courier status) within 5 seconds of the triggering event 95% of the time.

NFR-005: The system shall render dashboards and filtered exception lists within 3 seconds for result sets up to 10,000 records and within 10 seconds for larger result sets, with pagination and server-side filtering.

NFR-006: The system shall enforce role-based access control for all UI and API endpoints and deny unauthorized requests with appropriate HTTP status codes (401/403).

NFR-007: The system shall encrypt all sensitive data in transit using TLS 1.2+ and shall support TLS 1.3, and shall encrypt sensitive data at rest using a strong algorithm (AES-256 or equivalent) with managed keys.

NFR-008: The system shall support secrets and credential management via an enterprise key management solution (KMS) and shall rotate integration credentials at configurable intervals without downtime.

NFR-009: The system shall validate and sanitize all inbound data to protect against injection attacks and shall conform to OWASP Top 10 mitigations for web applications.

NFR-010: The system shall provide per-API rate limiting and throttling controls (configurable defaults: 100 requests/min per API key) and return standard rate-limit headers to clients.

NFR-011: The system shall make all public APIs idempotent where appropriate (e.g., order create with idempotency key) and document idempotency behavior in the API specification.

NFR-012: The system shall retry transient integration failures (ERP, courier) using an exponential backoff strategy with capped retries and shall log every attempt and outcome for troubleshooting.

NFR-013: The system shall achieve an API availability target of 99.9% (monthly) for core intake and exception APIs, measured and reported with an uptime dashboard and alerts for breach.

NFR-014: The system shall detect and surface integration health (success/error rates, latency) for connected systems and generate alerts when error rates exceed configurable thresholds (default: 1% error rate over 5 minutes).

NFR-015: The system shall support configurable SLA timers and routing rules and shall guarantee SLA timer accuracy to within ±1 second across distributed services by synchronizing clocks using NTP or equivalent.

NFR-016: The system shall allow SLA status queries via API and UI, returning SLA state (running, paused, breached) and remaining time, with SLA updates reflected in under 1 second from state change.

NFR-017: The system shall support secure, auditable pausing and resuming of SLA timers (e.g., awaiting customer response) and record the actor, reason, and timestamps for each pause/resume action.

NFR-018: The system shall support authentication and authorization integration with enterprise identity providers (SAML, OAuth2/OIDC) and enable single sign-on for users.

NFR-019: The system shall support PII minimization and masking: customer personal data fields shall be masked in UI exports by default and unmasked only for roles explicitly permitted by RBAC, with all access logged.

NFR-020: The system shall support configurable data retention policies (per data type) and implement automated data purge/archival workflows; data subject deletion requests shall be processed within 30 days and recorded in the audit log.

NFR-021: The system shall provide secure export and storage of attached documents (PDF, images, certificates) with access controls and malware scanning for uploaded files.

NFR-022: The system shall retain immutable audit logs for all critical events (create/update/assign/resolve/export/config changes) for a configurable default period of 7 years, support export in standard formats (CSV/JSON), and ensure logs are tamper-evident (write-once or cryptographic signing).

NFR-023: The system shall be deployable in an active-active or active-passive topology and shall support an RPO (Recovery Point Objective) of less than 5 minutes and an RTO (Recovery Time Objective) of less than 15 minutes for critical services in the chosen topology.

NFR-024: The system shall perform automatic failover to a secondary region or node when health checks fail, with failover completion within a configurable timeout (default 120 seconds) and with clear status visible in the monitoring dashboard.

NFR-025: The system shall perform daily incremental backups and weekly full backups of critical data stores, automate backup verification, and retain backup inventories; backup restores shall be tested at least quarterly.

NFR-026: The system shall provide end-to-end monitoring and alerting (metrics, logs, traces) and integrate with enterprise monitoring/incident systems (e.g., PagerDuty, Opsgenie) to notify on-call personnel for P1/P2 incidents.

NFR-027: The system shall require and pass scheduled vulnerability scanning and penetration testing (at least quarterly) and shall remediate critical vulnerabilities within SLA defined by the organization (e.g., within 7 days).

NFR-028: The system shall provide API-level SLAs and documented error behavior, including maximum acceptable latency for synchronous APIs (e.g., 95th percentile response time < 1s for read endpoints; < 2s for write endpoints under normal load).

NFR-029: The system shall log and expose service-level metrics for SLA compliance (exception creation latency, assignment latency, resolution time) and provide downloadable SLA reports for auditing.

NFR-030: The system shall support a usability standard of task-success rates ≥ 95% for key workflows (exception triage, assignment, resolution) as measured in usability tests, and maintain UI response times under 2 seconds for primary user interactions.

NFR-031: The system shall meet accessibility requirements conforming to WCAG 2.1 AA for the primary user-facing UI, including keyboard navigation, screen-reader compatibility, and color-contrast compliance.

NFR-032: The system shall provide role-appropriate help and contextual documentation within the UI and include onboarding checklists for new users and administrator guides for integration/configuration tasks.

NFR-033: The system shall throttle or shed non-critical workloads when system capacity is constrained (graceful degradation), prioritizing critical intake and exception-routing operations over background/reporting jobs.

NFR-034: The system shall provide configurable maintenance windows and shall support in-place rolling upgrades without downtime for critical user traffic where possible, with automatic traffic draining and health checks.

NFR-035: The system shall maintain per-tenant (or per-brand) isolation for data and configuration when deployed in multi-tenant mode, ensuring at-rest and in-transit separation of tenant data.

NFR-036: The system shall provide a documented incident response procedure including runbooks for common failure modes (integration outage, data corruption, SLA breach) and shall perform incident-response drills at least twice per year.

NFR-037: The system shall support auditability of configuration changes (connector mappings, SLA rules, RBAC changes) recording the actor, before/after values, and timestamps, and shall make this audit data queryable via API.

NFR-038: The system shall provide graceful degradation rules for courier/ERP connector outages: queue incoming events for replay, persist raw payloads, and continue accepting intake requests while marking affected downstream integrations as degraded in the UI.

NFR-039: The system shall enforce strong encryption key lifecycle management for all cryptographic keys (generation, rotation, revocation) and shall log key usage for forensic purposes.

NFR-040: The system shall document and enforce maximum acceptable data processing latency for near-real-time features (e.g., exception detection pipeline end-to-end within 10 seconds) and include automated tests to validate latency targets during CI/CD.


# Exception Classification Matrix

| Exception ID | Type | Description | Detection method | Required system action | Team responsible | SLA target | Escalation rule |
|---|---|---|---|---|---|---:|---|
| EX-001 | Missing customer info | Order missing required customer fields (name, phone, address, email) or invalid format. | Schema validation at intake / enrichment failure. | Create exception record; start SLA timer; auto-assign to Customer Support; notify customer (if contact exists); block fulfillment until resolved or explicitly overridden. | Customer Support | Initial contact within 2 hours; resolution within 24 hours | If unassigned or no response at 50% SLA → notify team lead; on breach → escalate to Operations Manager and flag order for manual review. |
| EX-002 | Inventory mismatch | Ordered SKU/quantity not available or BOM parts mismatch (vendor part vs BOM). | Inventory reservation failure / BOM comparator mismatch / ERP sync error. | Create exception; set priority; reserve partial stock where possible; present alternates; notify Production Planner and Procurement; attach comparator report. | Warehouse / Production Planner & Procurement & Design | Critical orders: resolve within 8 hours; non-critical: 24 hours | At 50% SLA notify Procurement lead; on breach → escalate to Operations Manager and trigger expedited procurement/backorder workflow. |
| EX-003 | Duplicate order | Potential duplicate detected (same customer, items, timestamp). | Duplicate detection engine comparing order signature / marketplace ID match. | Create duplicate exception; flag records; suggest merge/cancel; prevent duplicate fulfillment until resolved. | Customer Support / Operations | Resolution within 4 hours | If no action at 50% SLA → notify team lead; on breach → cancel duplicate pending confirmation and escalate to Operations Manager. |
| EX-004 | Courier delay / tracking issue | Courier reports delay, unknown tracking, or delivery exception affecting EDD. | Courier connector/webhook status indicating delay, exception, or API downtime. | Create courier exception; update order timeline; notify Courier Coordinator and Customer Support; attempt automated re-query; surface ETA changes. | Courier Management / Customer Support | Investigate within 1 hour; ETA update within 12 hours | If 50% SLA elapsed without ETA update → notify Logistics lead; on breach → escalate to Operations Manager and trigger customer communication. |
| EX-005 | Order modification request | Customer requests address change, quantity change, or cancellation after order placed. | Customer request via UI/chat/agent or marketplace modification event. | Create modification exception; pause fulfillment pipeline; validate feasibility; route to Support/Warehouse; apply change and propagate to ERP/WMS if approved. | Customer Support & Warehouse | Decision within 2 hours (pre-pick); cancel within 30 minutes before pick; post-pick case-by-case within 24 hours | If unresolved at 50% SLA → escalate to Warehouse Supervisor; on breach → apply configured policy (hold/return-to-stock) and notify Operations. |
| EX-006 | COD verification failure | COD payment could not be verified (invalid address/phone or collector failure). | COD verification service response or post-delivery payment status; payment gateway errors. | Create payment exception; place order on hold; notify Finance and Customer Support; attempt retry or request reconfirmation; block shipping until cleared. | Finance / Customer Support | Initial contact within 1 hour; resolution within 24 hours | If 50% SLA elapsed → notify Finance lead; on breach → cancel order per policy and escalate to Operations/Finance for refund/collection. |
| EX-007 | Split shipment / partial fulfilment | Order requires multiple consignments due to partial availability or multi-warehouse fulfillment. | Inventory/reservation check shows partial availability; fulfillment orchestration indicates split shipments. | Create informational split-shipment exception; update order with partial shipment plan; notify Production Planner and Customer Support; schedule follow-up for remaining items. | Production Planner / Warehouse & Customer Support | Remaining items fulfilled within defined lead-time (e.g., 72 hours) or per item SLA | If remaining items not fulfilled by 75% SLA → notify Warehouse Supervisor; on breach → escalate to Operations and trigger expedited procurement. |
| EX-008 | Refund or replacement request | Customer requests refund/replacement or system triggers refund due to failed fulfillment/quality. | Customer service request, return processing, or exception resolution outcome triggers refund/replacement. | Create refund/replacement exception; route to Finance/Warehouse; generate RMA if return required; process refund or create replacement order; notify customer and log disposition. | Customer Support & Finance & Warehouse | RMA/decision within 24 hours; refund processed within 7 business days (payment provider dependent) | If RMA/refund not processed at 50% SLA → notify Finance lead; on breach → escalate to Operations Manager and Customer Experience lead. |

# Process Flows — Unified Order Fulfilment & Exception Handling System

This document contains: 1) numbered end-to-end flows for the standard order lifecycle, exception identification, and exception resolution; and 2) an ASCII sequence flow diagram that highlights exception handling steps (marked with [EXCEPTION]).

---

## 1) Standard order lifecycle (numbered steps)

1. Customer places order via Website / Mobile / Chat / Marketplace / Manual upload.
2. Channel submits order to the Order Intake Service (canonical order record created).
3. Order Intake enqueues order for validation & enrichment.
4. Validation & Enrichment:
   - Validate required fields (customer, address, items, payment).
   - Normalize address and enrich with SKU/product master data.
5. Duplicate check runs; if duplicate not found continue.
6. Inventory/ERP reservation requested for all SKUs.
7. If reservation succeeds, order state → Reserved.
8. Order assigned to fulfillment (WMS) for pick & pack.
9. WMS confirms pick & pack; order state → Picked → Packed.
10. Courier shipment created; tracking number recorded.
11. Courier updates (tracking, EDD) ingested; order state → Shipped.
12. Delivery confirmed; order state → Delivered/Closed; post-process reporting and audit entry recorded.

---

## 2) Exception identification (numbered steps & system actions)

1. Order Intake or Validation step identifies anomalies (missing fields, failed enrichment).
   - [EXCEPTION] Create exception record, attach payload snapshot, start SLA timer.
2. Duplicate detection finds potential duplicate.
   - [EXCEPTION] Flag both records; prevent fulfillment; create duplicate exception.
3. Inventory reservation fails or BOM comparator reports mismatch.
   - [EXCEPTION] Create inventory/BOM exception; attach comparator or ERP response.
4. Courier connector reports delay/failure or tracking missing.
   - [EXCEPTION] Create courier exception and record last known status/ETA.
5. Payment gateway / COD verification reports failure.
   - [EXCEPTION] Create payment exception; place order on hold.
6. Any configured business-rule (threshold/boolean) evaluates to true for an event.
   - [EXCEPTION] Create rule-based exception and route per routing rules.
7. For every exception created:
   - SLA Engine assigns SLA timer based on category and brand.
   - Rule Engine determines routing (team/queue/priority).
   - Assignment: auto-assign or keep in queue for manual claim.
   - Notification(s) sent to owner/team and relevant stakeholders.

---

## 3) Exception resolution (triage → resolution → close)

1. Owner (auto-assigned user or claimed by user) opens exception detail view.
2. Review diagnostic payload, attachments, comparator reports, and automated suggestions (alternate parts, inventory options).
3. If external input required:
   - System sends templated external message to customer/supplier/courier and logs reply.
   - [EXCEPTION] SLA may be paused while awaiting external response (record reason & timestamps).
4. Owner performs one of:
   - Correct data (e.g., update customer info) → re-run validation → resolution path.
   - Approve an alternate part or supplier (with Quality sign-off if required) → update ERP and inventory → resolution.
   - Trigger refund/replacement flow → create RMA and notify Finance/Warehouse.
   - Escalate to specialist/team or apply configured escalation actions.
5. System records each action in activity timeline and audit log.
6. On resolution:
   - SLA timer stopped; resolution metadata committed.
   - If resolution requires downstream change, propagate update to ERP/WMS/Courier.
   - Notify customer and stakeholders of resolution outcome.
7. If SLA breaches before resolution:
   - Escalation actions run automatically (notify supervisor, raise priority, reassign or create incident).
   - Incident is tracked and recorded for post-mortem and reporting.

---

## ASCII Sequence Flow Diagram

Legend:
- [EXCEPTION] steps are highlighted and appear in uppercase in the diagram.
- Actors: Customer, Channel, Order Intake, Validation/Enrichment, Duplicate Detector, Inventory/BOM/ERP, Exception Engine, SLA Engine, Assignment/Queue, Owner (Support/Warehouse/Procurement/Finance), WMS, Courier, Reporting/Audit.

```
Customer -> Channel: Place Order
Channel -> Order Intake: Submit canonical order
Order Intake -> Validation/Enrichment: Validate fields & enrich
Validation/Enrichment -> Order Intake: Validation result
alt validation OK
    Order Intake -> Duplicate Detector: Check duplicates
    Duplicate Detector -> Order Intake: Not duplicate
    Order Intake -> Inventory/BOM/ERP: Reserve inventory / run BOM comparator
    Inventory/BOM/ERP -> Order Intake: Reservation OK
    Order Intake -> WMS: Send pick/pack request
    WMS -> Order Intake: Picked/Packed
    Order Intake -> Courier: Create shipment (tracking)
    Courier -> Order Intake: Tracking number
    Courier -> Order Intake: Tracking updates
    Order Intake -> Reporting/Audit: Log events & metrics
    Courier -> Customer: Deliver
    Customer -> Order Intake: Confirm delivery (optional)
else validation FAIL
    Validation/Enrichment -> Exception Engine: !! [EXCEPTION] MISSING/INVALID DATA
    Exception Engine -> SLA Engine: Start SLA (category=Missing customer info)
    SLA Engine -> Assignment/Queue: Route to Customer Support queue
    Assignment/Queue -> Owner (Support): Notify / assign
    Owner -> Exception Engine: Take ownership / resolve (update customer info)
    Owner -> Order Intake: Submit corrected order
    Order Intake -> Validation/Enrichment: Re-validate
    -> (back to normal flow if OK)
end

alt duplicate detected
    Duplicate Detector -> Exception Engine: !! [EXCEPTION] DUPLICATE ORDER
    Exception Engine -> SLA Engine: Start SLA (category=Duplicate)
    Exception Engine -> Assignment/Queue: Route to Support/Operations
    Assignment/Queue -> Owner (Support): Claim/resolve (merge/cancel)
    Owner -> Order Intake: Apply merge/cancel action
    -> (prevent duplicate fulfillment)
end

alt inventory/BOM mismatch or reservation fail
    Inventory/BOM/ERP -> Exception Engine: !! [EXCEPTION] INVENTORY/BOM MISMATCH
    Exception Engine -> SLA Engine: Start SLA (category=Inventory mismatch)
    Exception Engine -> Assignment/Queue: Route to Production Planner & Procurement & Design
    Assignment/Queue -> Owner(s): Notify with comparator report and suggested alternates
    Owner(s) -> Exception Engine: Approve alternate OR trigger procurement OR update BOM (with Quality sign-off if needed)
    Owner(s) -> ERP/WMS: Update reservation / place purchase order
    ERP/WMS -> Order Intake: Reservation updated
    -> (continue normal fulfillment)
end

alt courier delay / tracking issue
    Courier -> Exception Engine: !! [EXCEPTION] COURIER DELAY/TRACKING ISSUE
    Exception Engine -> SLA Engine: Start SLA (category=Courier)
    Exception Engine -> Assignment/Queue: Route to Courier Coordinator
    Assignment/Queue -> Courier Coordinator: Investigate / re-query
    Courier Coordinator -> Courier: Reroute / escalate to courier partner
    Courier -> Exception Engine: Update status
    -> (notify customer and continue)
end

alt payment / COD failure
    Payment Service -> Exception Engine: !! [EXCEPTION] PAYMENT/COD FAILURE
    Exception Engine -> SLA Engine: Start SLA (category=Payment)
    Exception Engine -> Assignment/Queue: Route to Finance & Support
    Assignment/Queue -> Owner (Finance/Support): Attempt verification / request customer reconfirmation
    Owner -> Payment Service: Retry or initiate refund/hold
    -> (order held until cleared or refunded)
end

note over Exception Engine,SLA Engine,Assignment/Queue: All exception actions are recorded in activity timeline and immutable audit logs
note over SLA Engine: SLA pause/resume logic applies for external-wait states

-- Exception Resolution to Close --
Owner -> Exception Engine: Mark resolved + add resolution notes
Exception Engine -> SLA Engine: Stop SLA timer and record resolution time
Exception Engine -> Order Intake: If needed, propagate update to ERP/WMS/Courier
Order Intake -> Reporting/Audit: Finalize event logs and metrics

End.
```
- Mermaid diagram (renderable): see `BA/PROCESS_FLOWS_MERMAID.md` or click [Mermaid sequence diagram](PROCESS_FLOWS_MERMAID.md).

