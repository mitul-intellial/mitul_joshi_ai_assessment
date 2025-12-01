"""
Core BOM Comparison Logic.

This module provides the function to compare a master BOM list against a target
BOM list. It identifies differences based on the Manufacturer Part Number (MPN)
as the unique key.
"""
from typing import List, Dict, Any
from .models import BOMItem

def compare_boms(master_list: List[BOMItem], target_list: List[BOMItem]) -> Dict[str, Any]:
    """
    Compares a master and target list of BOM items.

    This function uses the MPN as a unique identifier to match items between the
    two lists. It categorizes every item from both lists into one of the
    following categories:
    - Matched (present in both with identical data)
    - Missing (present in master but not in target)
    - Extra (present in target but not in master)
    - Mismatched (present in both but with different data)

    Mismatched items are further broken down by the type of discrepancy. Note that
    a single item can appear in multiple mismatch lists if it has more than one
    difference (e.g., both quantity and description are different).

    Args:
        master_list: A list of BOMItem dictionaries for the master BOM.
        target_list: A list of BOMItem dictionaries for the target BOM.

    Returns:
        A dictionary containing the structured comparison results.
    """
    # Use dictionaries for efficient O(1) lookups by MPN.
    master_map = {item['MPN']: item for item in master_list}
    target_map = {item['MPN']: item for item in target_list}

    master_mpns = set(master_map.keys())
    target_mpns = set(target_map.keys())

    # Find MPNs that are unique to each BOM.
    missing_mpns = master_mpns - target_mpns
    extra_mpns = target_mpns - master_mpns
    
    # Find MPNs that are common to both BOMs for detailed comparison.
    common_mpns = master_mpns & target_mpns

    # Initialize the structure for the comparison results.
    comparison_result = {
        "missing_items": [master_map[mpn] for mpn in missing_mpns],
        "extra_items": [target_map[mpn] for mpn in extra_mpns],
        "mismatched_quantity": [],
        "mismatched_description": [],
        "mismatched_refdes": [],
        "matched": []
    }

    # Iterate through common items to find matches and mismatches.
    for mpn in common_mpns:
        master_item = master_map[mpn]
        target_item = target_map[mpn]
        is_mismatched = False

        # 1. Detect quantity mismatch.
        if master_item['Quantity'] != target_item['Quantity']:
            is_mismatched = True
            comparison_result['mismatched_quantity'].append({
                'MPN': mpn,
                'master_item': master_item,
                'target_item': target_item
            })

        # 2. Detect description differences.
        if master_item['Description'] != target_item['Description']:
            is_mismatched = True
            comparison_result['mismatched_description'].append({
                'MPN': mpn,
                'master_item': master_item,
                'target_item': target_item
            })

        # 3. Detect differences in Reference Designators.
        master_refdes = set(master_item['RefDes'])
        target_refdes = set(target_item['RefDes'])

        if master_refdes != target_refdes:
            is_mismatched = True
            comparison_result['mismatched_refdes'].append({
                'MPN': mpn,
                'master_item': master_item,
                'target_item': target_item,
                'added_refdes': sorted(list(target_refdes - master_refdes)),
                'removed_refdes': sorted(list(master_refdes - target_refdes))
            })

        # 4. If no mismatches were found, the item is a perfect match.
        if not is_mismatched:
            comparison_result['matched'].append(master_item)

    return comparison_result
