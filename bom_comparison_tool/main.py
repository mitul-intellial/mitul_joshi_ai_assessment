"""
BOM Comparison Tool - Main Entry Point

This script orchestrates the entire Bill of Materials (BOM) comparison process.
It takes a master BOM file and one or more target BOM files as command-line
arguments, performs a detailed comparison, and outputs the results.

Flow:
1. Parses command-line arguments for master and target file paths.
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
from core.utils import save_json # Import the new utility function

def main():
    """Main function to drive the BOM comparison tool."""
    parser = argparse.ArgumentParser(description="Compare a master BOM file with one or more target BOM files.")
    parser.add_argument("master_file", help="Path to the master BOM file (XLSX, CSV, etc.)")
    parser.add_argument("target_files", nargs='+', help="Paths to 1-5 target BOM files to compare against the master.")
    parser.add_argument("-o", "--output", default="comparison_output.json", help="Path to save the final JSON comparison report.")
    
    args = parser.parse_args()

    if not (1 <= len(args.target_files) <= 5):
        print("Error: Please provide between 1 and 5 target files.")
        return

    # 1. Load Master BOM
    print(f"Loading master BOM: {args.master_file}")
    master_bom = parse_bom_file(args.master_file)
    if 'error' in master_bom:
        print(f"Fatal Error: Could not parse master file. Reason: {master_bom['error']}")
        return

    # This will hold the final data for the JSON output
    final_report = {
        "master_source": args.master_file,
        "comparisons": []
    }

    # 2. Loop through and process each target file
    for target_file in args.target_files:
        print("\n" + "="*80)
        print(f"PROCESSING: {target_file}")
        print("="*80)

        # 3. Load Target BOM
        target_bom = parse_bom_file(target_file)
        if 'error' in target_bom:
            print(f"  -> Error parsing target file: {target_bom['error']}")
            final_report["comparisons"].append({
                "target_file": target_file,
                "result": {"error": target_bom['error']}
            })
            continue

        # 4. Compare master with the current target
        comparison_result = compare_boms(master_bom, target_bom)

        # 5. Print the results to the console using the new formatter
        summary_str = format_summary(comparison_result)
        table_str = format_comparison_as_table(comparison_result)

        print(summary_str)
        print("\n" + "-"*80)
        print("DETAILED COMPARISON")
        print("-" * 80)
        print(table_str)


        # 6. Store the full result for the final JSON report
        final_report["comparisons"].append({
            "target_file": target_file,
            "result": comparison_result
        })

    # 7. Save the full comparison report to a JSON file using the utility function
    save_json(final_report, args.output)

if __name__ == "__main__":
    main()
