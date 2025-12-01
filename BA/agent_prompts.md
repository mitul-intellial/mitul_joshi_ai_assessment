#PROMPT 1: MASTER PROMPT
Act as a senior Business Analyst.

I need to create a Software Requirements Specification (SRS) for the following topic:

--- CONTEXT START ---
[SRS Creation Task – Multi-Channel Order Fulfilment & Exception Handling System
A company operates an e-commerce backend platform used by multiple client brands.
Currently, orders come in from multiple channels:
Website
Mobile App
WhatsApp Business
Marketplace APIs (Amazon, Flipkart, etc.)
Manual bulk order upload (Excel)
The fulfilment process involves:
Order validation
Inventory check
Assigning warehouse
Packaging
Handover to courier partner
Tracking updates
Delivery confirmation
** Current Problem**
The company faces
frequent exceptions
in the fulfilment process:
Orders stuck due to missing customer data
Inventory mismatch between ERP and warehouse
Courier partner API delays
Duplicate orders from WhatsApp bot
Customer wanting to modify orders after confirmation
COD verification failures
Split order shipments not handled properly
Refund or replacement requests not tracked centrally
Operations teams currently manage all exceptions via:
Email
WhatsApp
Google Sheets
Verbal communication
This causes delays, lost orders, customer complaints, and SLA penalties.
Goal
Management wants to build a
Unified Order Fulfilment & Exception Handling System
that:
Consolidates orders from all channels
Detects exceptions automatically
Routes exceptions to the correct team
Provides configurable SLAs
Supports internal chat on each order
Provides a dashboard
Integrates with at least two external systems:
ERP
Courier tracking API
Output
Generate a comprehensive functional requirements document for the software developmentteam.
The document
must contain
a user interface mockup of all important screens.]
--- CONTEXT END ---

Before drafting the SRS, ask me 8–12 sharp clarifying questions focusing on:
- order source channels
- integration points
- exception categories
- allowed SLAs
- access roles
- reporting and dashboards
- scope boundaries
- UI expectations

Wait for my responses before drafting the SRS.

Clarifying Questions:

   1. Order Channels: For the "Manual bulk order upload," what is the expected volume and frequency? Can you provide a sample of the Excel file structure you
      currently use?
   2. Integration Points (ERP): Which specific ERP system is in use (e.g., SAP, Oracle, NetSuite, or a custom solution)? What is the required data sync frequency
      (real-time, hourly, daily) for inventory and order status?
   3. Integration Points (Courier): Do you work with specific courier partners (e.g., Delhivery, Blue Dart, DTDC) or a courier aggregator platform? What is the
      complete list of tracking statuses we need to capture?
   4. Exception Categories: Should the system allow an administrator to define new exception types and their routing rules dynamically, or will this be a fixed
      list defined at the start?
   5. SLAs: How should SLAs be measured (e.g., time to first response, time to resolution)? What are the escalation hierarchies when an SLA is breached (e.g.,
      notify team lead, then department head)?
   6. Access Roles: Could you list the primary user roles (e.g., Customer Support Agent, Warehouse Manager, Finance Executive, System Admin) and the top 1-2
      actions each role must be able to perform?
   7. Reporting & Dashboards: What are the top 5 most critical KPIs that must be visible on the main dashboard for a senior manager to see at a glance (e.g.,
      Total Pending Exceptions, Average Resolution Time, SLA Breach %)?
   8. Scope Boundaries (Customer Communication): Is the system's scope limited to internal exception management, or should it also generate and send notifications
      (Email/SMS) to the end customer about order issues?
   9. Scope Boundaries (Order Modification): What specific order modifications are allowed after confirmation (e.g., changing address, contact number, product
      size/color, cancellation)? Is there a cut-off point in the fulfilment process after which no more changes are permitted?
   10. UI Expectations: For the UI mockups, are you expecting low-fidelity wireframes focusing on layout and workflow, or high-fidelity mockups that define the
       visual design, including colors and branding?
   11. Exception Prioritization: Should the system be able to prioritize exceptions based on certain criteria, such as order value, client brand, or customer
       loyalty status?
   12. Historical Data: Do we need to plan for migrating any historical order or exception data from the existing Google Sheets and Excel files into the new
       system?

Here are my responses to the clarification questions. 
Use these answers to proceed with the SRS creation.

1. Order Source Channels
Orders must be consolidated from:
- Website checkout system
- Mobile App
- WhatsApp Business Bot
- Marketplace Platforms (Amazon, Flipkart)
- Manual Excel Upload by operations team

All channels must push orders to a unified Order Intake Service.

2. Integration Expectations
Two mandatory external integrations:
- ERP (for inventory sync, product validation, order status update)
- Courier Tracking API (shipment status, tracking number, EDD, delivery confirmation)

Integrations should be bi-directional where feasible.

3. Exception Categories to Support
The system must detect and classify exceptions like:
- Missing customer details
- Duplicate orders
- Inventory mismatch
- Courier API delay or downtime
- Order modification request after confirmation
- COD verification failure
- Partial shipment or split order case
- Refund or replacement claim not completed

4. SLA Configuration
Each exception type must have:
- Default SLA timers
- Configurable SLA per client brand
- Visual timer countdown
- Escalation triggers on breach

5. User Roles and Access
Roles expected:
- Customer Support Agent
- Warehouse Supervisor
- ERP Administrator
- Courier Management Coordinator
- Operations Manager

Access must be role-based and configurable.

6. Exception Assignment Rules
The system should auto-assign exceptions based on:
- Exception category
- Channel source
- SKU/Warehouse mapping
- Client brand service rules
- SLA priority

Users should be able to reassign cases manually.

7. Dashboard & Reporting
The system must provide:
- Exception volume by type
- SLA status: open, breached, resolved
- Order fulfilment stage progress
- Courier delivery status
- Channel-wise order volume
- Resolution performance trends

Data export to CSV should be supported.

8. Scope Boundaries
Out of scope:
- Payment gateway integration
- Creation of courier shipping labels
- Full returns management workflow (only exception flag, assignment, SLA handling)

9. UI Expectations
For all major screens, low-fidelity mockups must show:
- Exception list view with filters
- Exception detail view with activity log and internal chat
- Dashboard layout
- Order details panel
- SLA timer display
- Assignment widget
- Flags for exception category and breach

10. Workflow Trigger Points
Exception detection must run at:
- Time of order intake
- Before warehouse dispatch
- At courier handover stage
- At delivery failure scans
- When customer requests modification or refund

11. Data to be Displayed in Exception Ticket
Each exception record must include:
- Order ID
- Channel
- Root exception category
- Sub-category
- Exception description
- Assigned team/user
- SLA timer
- Resolution notes
- Internal chat thread
- Time stamps
- Linked ERP/Courier logs

12. Business Goal
Outcome required:
- Reduce SLA breaches
- Improve resolution visibility
- Centralise exception communication
- Provide structured audit trail
- Improve customer satisfaction ratings and reduce penalty charges


Prompt 2 — Personas & Stakeholder Matrix
Act as a business analyst.

Based on the system context and the answers I provided, create:
1. Persona list (3–6 personas)
2. Stakeholder Responsibility Matrix (Responsibility, Pain Points, Needs)
3. Persona-level goals, frustrations, and decision triggers

Format in tables.


Prompt 3 — End-to-End Use Case List
Act as a business analyst.

Generate a complete list of use cases for the Unified Order Fulfilment & Exception Handling System.

Ensure the list covers:
- order intake from all channels
- order processing steps
- automated exception detection
- SLA-based routing
- exception handling communication
- warehouse and courier integrations
- order modification
- refunds/replacement
- dashboards
- audit & logs
- admin configuration

Present the result as:
- Use Case ID
- Name
- Short description
- Trigger
- Actor(s)
- Expected outcome



Prompt 4 — Functional Requirements (Main Deliverable)Act as a senior BA.
Using the requirement text, personas, and use cases, generate a complete Functional Requirements section for the SRS.

Rules:
- Each requirement must start with “The system shall…”
- Group logically under sections:
  * Omni-channel order intake
  * Order processing workflow
  * Exception detection engine
  * Exception routing & SLA rules
  * Internal communication & collaboration
  * Integrations (ERP & courier)
  * Dashboards & reporting
  * Audit & compliance
  * Configuration & administration
- Prefix every requirement with ID: FR-XXX.
- Ensure testability, clarity, and completeness.

Output only the functional requirement list.


Prompt 5 — Non-Functional Requirements (NFRs)
Now generate Non-Functional Requirements for the same system.

Cover:
- performance & throughput
- security
- data privacy
- API reliability
- SLA guidelines
- usability & accessibility
- audit traceability
- availability
- failover rules

Prefix each ID as NFR-XX.


Prompt 6 — Exception Taxonomy (Critical Point!)
Create an Exception Classification Matrix based on the context.

For each exception:
- Exception ID
- Type
- Description
- Detection method
- Required system action
- Team responsible
- SLA target
- Escalation rule

Include cases like:
- Missing customer info
- Inventory mismatch
- Duplicate order
- Courier delay
- Order modification request
- COD verification failure
- Split shipment
- Refund or replacement

Prompt 7 — Process Flow Diagrams (User Journey)
Generate an end-to-end process flow for:
1. Standard order lifecycle
2. Exception identification
3. Exception resolution

Format as:
- numbered step flow
AND
- ASCII sequence flow diagram

Make exception handling steps visually identifiable.


Prompt 8 — UI Mockups (Last Requirement!)
Create UI mockups for the major screens of this system.

Mandatory screens:
1. Order Intake Dashboard
2. Exception Workbench (list + filters)
3. Exception Detail View (chat, status, SLA, activity log)
4. Order Details Page
5. SLA Configuration Page
6. Integration Monitoring Screen
7. Reports/Dashboard View

Format:
- Low fidelity wireframes using ASCII box layout
- Label key fields and actions clearly
- Include:
  * Tabs
  * Table columns
  * Buttons
  * Filters
  * Alerts
  * SLA timers
  * Assigned team
  * Exception reason tags

Output ONLY mockups, no commentary text.

