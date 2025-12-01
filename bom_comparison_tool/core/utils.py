"""
Utility functions for the BOM Comparison Tool.

This module contains common, reusable functions that support various
parts of the application, such as file I/O operations.
"""
import json

def save_json(data: dict, file_name: str = "comparison_result.json"):
    """
    Saves a dictionary to a JSON file with pretty printing.

    This ensures the output is human-readable and can be easily parsed later.

    Args:
        data: The dictionary payload to save.
        file_name: The name of the output file.

    Returns:
        None
    """
    try:
        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"\nFull comparison report saved successfully to: {file_name}")
    except IOError as e:
        print(f"\nError: Could not write JSON report to {file_name}. Reason: {e}")
    except TypeError as e:
        print(f"\nError: Data is not serializable to JSON. Reason: {e}")


