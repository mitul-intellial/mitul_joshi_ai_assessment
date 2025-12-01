
"""
BOM Comparison Tool - Main Entry Point

This script orchestrates the entire Bill of Materials (BOM) comparison process.
It allows users to select a master BOM file and one or more target BOM files
via a graphical user interface (GUI), performs a detailed comparison, and
outputs the results to the console and a JSON report.

Flow:
1. Launches a GUI for file selection.
2. Loads and normalizes the master BOM file.
3. Iterates through each target file:
    a. Loads and normalizes the target BOM.
    b. Compares it against the master BOM.
    c. Prints a summary of differences (counts).
    d. Prints a detailed, table-formatted view of all discrepancies.
4. Saves a comprehensive JSON report of all comparisons to a file.

"""
import argparse
import json
from typing import Dict, Any

# It's conventional to place imports from your own project after standard library imports.
from core.parsers import parse_bom_file
from core.comparator import compare_boms
from core.formatter import format_summary, format_comparison_as_table
from core.models import BOMItem, ErrorDict
from core.utils import save_json
from ui_file_selector import launch_file_selector # Import the new UI function

def main():
    """Main function to drive the BOM comparison tool."""
    # Argument parser for optional output file name
    parser = argparse.ArgumentParser(description="BOM Comparison Tool with GUI file selection.")
    parser.add_argument("-o", "--output", default="comparison_output.json", help="Path to save the final JSON comparison report.")
    args = parser.parse_args()

    # 1. Launch GUI for file selection
    print("Launching file selection GUI...")
    master_file, target_files = launch_file_selector()

    if master_file is None or target_files is None:
        print("File selection cancelled by user. Exiting.")
        return

    # 2. Load Master BOM
    print(f"Loading master BOM: {master_file}")
    master_bom = parse_bom_file(master_file)
    if 'error' in master_bom:
        print(f"Fatal Error: Could not parse master file. Reason: {master_bom['error']}")
        return

    # This will hold the final data for the JSON output
    final_report = {
        "master_source": master_file,
        "comparisons": []
    }

    # 3. Loop through and process each target file
    for target_file in target_files:
        print("\n" + "="*80)
        print(f"PROCESSING: {target_file}")
        print("="*80)

        # 4. Load Target BOM
        target_bom = parse_bom_file(target_file)
        if 'error' in target_bom:
            print(f"  -> Error parsing target file: {target_bom['error']}")
            final_report["comparisons"].append({
                "target_file": target_file,
                "result": {"error": target_bom['error']}
            })
            continue

        # 5. Compare master with the current target
        comparison_result = compare_boms(master_bom, target_bom)

        # 6. Print the results to the console using the new formatter
        summary_str = format_summary(comparison_result)
        table_str = format_comparison_as_table(comparison_result)

        print(summary_str)
        print("\n" + "-"*80)
        print("DETAILED COMPARISON")
        print("-" * 80)
        print(table_str)


        # 7. Store the full result for the final JSON report
        final_report["comparisons"].append({
            "target_file": target_file,
            "result": comparison_result
        })

    # 8. Save the full comparison report to a JSON file using the utility function
    save_json(final_report, args.output)

if __name__ == "__main__":
    main()

