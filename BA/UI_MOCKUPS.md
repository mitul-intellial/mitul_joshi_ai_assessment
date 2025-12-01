# UI Mockups — Unified Order Fulfilment & Exception Handling System

---

## 1) Order Intake Dashboard

+--------------------------------------------------------------------------------+
| Tabs: [Overview] [Intake Queue] [Channels] [Settings]                         |
+--------------------------------------------------------------------------------+
| Filters: [Channel▼] [Date Range▼] [Status▼] [Search ⌕]                         |
+--------------------------------------------------------------------------------+
| Alerts: [WARN] 3 pending validation exceptions | [INFO] 12 shipments delayed     |
+--------------------------------------------------------------------------------+
| Summary Cards:                                                                 |
|  Orders Today: 1,342   | Exceptions: 28   | SLA Breaches: 2   | Throughput: 120/m |
+--------------------------------------------------------------------------------+
| Intake Table (columns):                                                         |
|  [ ] | Order ID | Channel | Customer | Items | Value | Status | Exception Tag | SLA  |
+--------------------------------------------------------------------------------+
|  [ ] | ORD-1023 | Website | Singh    | 3     | $120  | Validated | -            | -    |
|  [ ] | ORD-1024 | WhatsApp| Kumar    | 1     | $25   | Exception | MISSING_INFO  | 20:12|
|  [ ] | ORD-1025 | Amazon  | Mehta    | 2     | $78   | Reserved  | INVENTORY     | 04:55|
+--------------------------------------------------------------------------------+
| Actions: [Refresh] [Export CSV] [Bulk Validate] [Open Selected]                |
+--------------------------------------------------------------------------------+

Notes:
- Exception Tag column shows reason tags (e.g., MISSING_INFO, INVENTORY, DUPLICATE).
- SLA column shows countdown timers (HH:MM) per exception row.

---

## 2) Exception Workbench (list + filters)

+--------------------------------------------------------------------------------+
| Tabs: [Workbench] [My Queue] [Escalations] [Templates]                         |
+--------------------------------------------------------------------------------+
| Left Filters Pane:                                                              |
|  - Category: [All ▼] (Missing Info, Inventory, Courier, Payment, BOM, Duplicate)|
|  - Priority: [All ▼] (Critical, High, Medium, Low)                             |
|  - Assigned Team: [Any ▼] (Support, Warehouse, Procurement, Finance)           |
|  - SLA Status: [All ▼] (On-time, At-risk, Breached)                            |
|  - Date Range: [Last 24h ▼]                                                     |
+------------------------+-------------------------------------------------------+
| Results / List         | Details Pane (preview)                                  |
+------------------------+-------------------------------------------------------+
| Columns:               | Selected Exception Summary                              |
|  [ ] | EX-ID | Type   |  EX-102 | Missing customer info                              |
|  [ ] | EX-103 | Inventory|  Order: ORD-1025                                     |
|  [ ] | EX-104 | Courier |  Customer: Mehta                                     |
|  [ ] | EX-105 | Payment |  SLA: 04:55 (At-risk)                                 |
+------------------------+-------------------------------------------------------+
| Table Actions: [Assign] [Claim] [Resolve] [Escalate] [Add Note]                 |
+--------------------------------------------------------------------------------+
| Footer: Page 1 of 12   [<<] [<] [1] [2] [3] [>] [>>]                              |
+--------------------------------------------------------------------------------+

---

## 3) Exception Detail View (chat, status, SLA, activity log)

+--------------------------------------------------------------------------------+
| Header: EX-102  | Type: MISSING_CUSTOMER_INFO  | Status: Open | SLA: 20:12 (At-risk)  |
| Assigned Team: Customer Support  | Assigned To: R. Patel  | Priority: High          |
+--------------------------------------------------------------------------------+
| Tabs: [Summary] [Chat] [Activity Log] [Attachments] [Related Orders] [Config]   |
+--------------------------------------------------------------------------------+
| Summary Panel (left)             | Chat / Timeline (center)                         |
+--------------------------------------------------------------------------------+
| Order: ORD-1024                  | [Chat thread]                                    |
| Customer: Kumar                  |  R.Patel (Support) 10:12: "Please confirm phone" |
| Channel: WhatsApp                |  Customer 10:15: "Phone updated to +91-9xxxx"   |
| Exception Reason Tags: [MISSING_PHONE] [ADDRESS_MISMATCH]                       |
| Suggested Actions: [Update Customer] [Send Template] [Escalate]                 |
+--------------------------------------------------------------------------------+
| Activity Log (tab selectable)                                                  |
|  - 2025-12-01 10:00 | EX created (Validation failure)                      |
|  - 2025-12-01 10:05 | Auto-assigned to Support queue                       |
|  - 2025-12-01 10:12 | Message sent to customer (template: Request phone)   |
+--------------------------------------------------------------------------------+
| Attachments: [Upload] [View All]                                               |
+--------------------------------------------------------------------------------+
| Bottom Actions: [Resolve] [Add Note] [Pause SLA] [Reassign] [Create RMA]       |
+--------------------------------------------------------------------------------+

Visual elements:
- SLA timer displayed prominently with color (green/yellow/red) depending on state.
- Exception reason tags displayed as pill badges.
- Chat supports mentions and quick templates.

---

## 4) Order Details Page

+--------------------------------------------------------------------------------+
| Header: Order ORD-1025  | Status: Reserved  | Value: $78 | Channel: Amazon           |
+--------------------------------------------------------------------------------+
| Tabs: [Overview] [Shipments] [Items/BOM] [Exceptions] [Audit] [Invoices]       |
+--------------------------------------------------------------------------------+
| Left: Order Summary                  | Right: Shipments & Fulfillment                   |
+--------------------------------------------------------------------------------+
| Customer: Mehta                      | Shipment #1: SHP-556 (Partial)                   |
| Phone: +91-8xxxx                     |  - Status: Packed                                 |
| Address: 22 Industrial Rd            |  - Tracking: 123456789                           |
| Payment: Prepaid                     |  - Courier: FastShip                              |
+--------------------------------------------------------------------------------+
| Items / BOM Table:                   | Exception Panel (if any)                          |
| Columns: [Line] [SKU] [Desc] [Qty] [Reserved] [Location]                         |
|  1 | SKU-111 | Widget A | 1 | Yes | WH-1                                         |
|  2 | SKU-222 | Widget B | 2 | Partial | WH-2                                     |
+--------------------------------------------------------------------------------+
| Exceptions Tab: lists EX-103 (Inventory) with link to Exception Detail View    |
+--------------------------------------------------------------------------------+
| Actions: [Print Picklist] [Cancel Order] [Create Shipment] [Raise Exception]   |
+--------------------------------------------------------------------------------+

---

## 5) SLA Configuration Page

+--------------------------------------------------------------------------------+
| Tabs: [SLA Rules] [Escalations] [Templates] [Audit]                              |
+--------------------------------------------------------------------------------+
| SLA Rules Table:                                                                 |
| Columns: [Rule ID] [Category] [Brand] [Time] [Pause Conditions] [Priority] [Active]
+--------------------------------------------------------------------------------+
|  [R-01] | Missing Data | Brand A | 24h | Awaiting customer response | High | [ON]       |
|  [R-02] | Inventory    | All     | 8h  | Awaiting supplier doc       | Critical | [ON]  |
+--------------------------------------------------------------------------------+
| Rule Editor (selected):                                                         |
|  - Category: [Missing Data ▼]                                                   |
|  - Brand: [Brand A ▼]                                                           |
|  - SLA Time: [24] [hours]                                                       |
|  - Pause Conditions: [Awaiting Customer] [Awaiting Supplier Doc]               |
|  - Escalation Steps: 50% -> Notify Team Lead | 100% -> Escalate to Ops        |
|  - Buttons: [Save Rule] [Test Rule] [Disable]                                  |
+--------------------------------------------------------------------------------+
| Escalation Matrix:                                                              |
|  - On 50% SLA: Notify -> Email + In-app Alert                                  |
|  - On Breach: Create Incident + PagerDuty                                      |
+--------------------------------------------------------------------------------+

---

## 6) Integration Monitoring Screen

+--------------------------------------------------------------------------------+
| Tabs: [Overview] [ERP Connectors] [Courier Connectors] [History] [Alerts]     |
+--------------------------------------------------------------------------------+
| Connector Health Cards:                                                         |
|  ERP - Main: [OK ✓] Latency: 120ms | Error Rate: 0.4% | Last Sync: 2m ago        |
|  WMS - Warehouse: [WARN !] Latency: 800ms | Error Rate: 2.1% | Last Sync: 10m ago     |
|  Courier - FastShip: [OK ✓] Latency: 200ms | Error Rate: 0.1%                |
+--------------------------------------------------------------------------------+
| Connector Table:                                                                 |
| Columns: [Conn ID] [Type] [Endpoint] [Status] [Latency] [Error Rate] [Last Activity]
+--------------------------------------------------------------------------------+
|  [ERP-01] | ERP | https://erp.company/api | OK | 120ms | 0.4% | 2025-12-01 10:10   |
|  [WMS-02] | WMS | https://wms.wh/api      | WARN | 800ms | 2.1% | 2025-12-01 10:00  |
+--------------------------------------------------------------------------------+
| Alerts Feed:                                                                     |
|  - 10:05 WARN WMS-02 high latency                                              |
|  - 09:58 ERROR Courier-FastShip webhook timeout                                |
+--------------------------------------------------------------------------------+
| Actions: [Test Connection] [Reconnect] [View Logs] [Export Metrics]           |
+--------------------------------------------------------------------------------+

---

## 7) Reports / Dashboard View

+--------------------------------------------------------------------------------+
| Tabs: [Overview] [SLA Performance] [Exception Trends] [User Productivity]      |
+--------------------------------------------------------------------------------+
| Top KPIs:                                                                       |
|  - Total Exceptions (30 days): 412   | SLA Compliance: 94.2%                  |
|  - Avg Time to Resolve: 6h 12m       | Breach Rate: 2.1%                     |
+--------------------------------------------------------------------------------+
| Charts Area:                                                                     |
|  [Exception Volume by Category (bar)]   [SLA Trend (line)]                      |
|  [Top Root Causes (pie)]               [Team Productivity (heatmap)]           |
+--------------------------------------------------------------------------------+
| Reports Table:                                                                    |
| Columns: [Report Name] [Type] [Schedule] [Last Run] [Actions]                    |
+--------------------------------------------------------------------------------+
|  [R-01] Daily SLA Summary | CSV | Daily 00:05 | 2025-12-01 00:05 | [Run] [Edit] [Download]
+--------------------------------------------------------------------------------+
| Actions: [Create Report] [Export Dashboard as PDF] [Subscribe]                  |
+--------------------------------------------------------------------------------+

---

*End of mockups*
