"""
Formatting for BOM Comparison Tool Outputs.

This module provides functions to format the results of a BOM comparison
into human-readable strings, including color-coded tables for console output.
"""
from typing import Dict, Any, List

# ANSI color codes for highlighting differences in the console.
COLORS = {
    "GREEN": "\033[92m",
    "RED": "\033[91m",
    "YELLOW": "\033[93m",
    "RESET": "\033[0m",
}

def format_summary(result: Dict[str, Any]) -> str:
    """Creates a string summarizing the counts of differences."""
    summary_lines = ["Summary of Differences:"]
    summary_data = {
        "Missing Items": len(result["missing_items"]),
        "Extra Items": len(result["extra_items"]),
        "Mismatched Quantity": len(result["mismatched_quantity"]),
        "Mismatched Description": len(result["mismatched_description"]),
        "Mismatched RefDes": len(result["mismatched_refdes"]),
        "Perfectly Matched": len(result["matched"]),
    }
    
    has_differences = False
    for key, count in summary_data.items():
        if count > 0:
            has_differences = True
            summary_lines.append(f"  - {key}: {count}")
            
    if not has_differences:
        return "No differences found. All items matched perfectly."
        
    return "\n".join(summary_lines)

def format_comparison_as_table(result: Dict[str, Any]) -> str:
    """
    Formats the comparison result into a side-by-side table string.

    The table includes columns for MPN, Master Quantity, Target Quantity, and
    a Status, with rows highlighted using ANSI colors.
    """
    
    # A dictionary to hold the consolidated data for each MPN.
    # Key: MPN, Value: {master_item, target_item, status_list}
    unified_data: Dict[str, Dict[str, Any]] = {}

    def get_item(mpn):
        """Helper to initialize an entry in the unified_data dictionary."""
        if mpn not in unified_data:
            unified_data[mpn] = {'master_item': None, 'target_item': None, 'statuses': []}
        return unified_data[mpn]

    # Process all categories from the comparison result.
    for item in result['matched']:
        entry = get_item(item['MPN'])
        entry['master_item'] = item
        entry['target_item'] = item
        entry['statuses'].append('OK')

    for item in result['missing_items']:
        entry = get_item(item['MPN'])
        entry['master_item'] = item
        entry['statuses'].append('MISSING')

    for item in result['extra_items']:
        entry = get_item(item['MPN'])
        entry['target_item'] = item
        entry['statuses'].append('EXTRA')

    # Process mismatch lists. Now they contain the full items.
    for item in result['mismatched_quantity']:
        entry = get_item(item['MPN'])
        entry['master_item'] = item['master_item']
        entry['target_item'] = item['target_item']
        entry['statuses'].append('DIFF QUANTITY')

    for item in result['mismatched_description']:
        entry = get_item(item['MPN'])
        entry['master_item'] = item['master_item']
        entry['target_item'] = item['target_item']
        entry['statuses'].append('DIFF DESCRIPTION')

    for item in result['mismatched_refdes']:
        entry = get_item(item['MPN'])
        entry['master_item'] = item['master_item']
        entry['target_item'] = item['target_item']
        entry['statuses'].append('DIFF REFDES')

    # --- Build the table string ---
    header = f"{'MPN':<25} | {'Master Qty':<12} | {'Target Qty':<12} | {'Status'}"
    table_lines = [header, "-" * (len(header) + 5)]

    if not unified_data:
        return "No data to display."

    # Sort by MPN for a consistent order.
    for mpn in sorted(unified_data.keys()):
        entry = unified_data[mpn]
        # Use set to remove duplicate statuses if an item has multiple mismatches
        statuses = sorted(list(set(entry['statuses'])))
        
        master_qty = entry['master_item']['Quantity'] if entry['master_item'] else '-'
        target_qty = entry['target_item']['Quantity'] if entry['target_item'] else '-'
        
        status_str = ', '.join(statuses)
        
        # Determine color based on status
        color = COLORS['RESET']
        if 'OK' in statuses:
            color = COLORS['GREEN']
        elif 'MISSING' in statuses or 'EXTRA' in statuses:
            color = COLORS['YELLOW']
        else: # Any other difference (DIFF QUANTITY, etc.)
            color = COLORS['RED']

        row_str = f"{mpn:<25} | {str(master_qty):<12} | {str(target_qty):<12} | {status_str}"
        table_lines.append(f"{color}{row_str}{COLORS['RESET']}")

    return "\n".join(table_lines)
