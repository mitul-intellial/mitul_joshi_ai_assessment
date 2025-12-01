"""
Data models for the BOM Comparison Tool.

This module defines the standard data structures used throughout the application,
ensuring consistency between the parsing, comparison, and exporting stages.
"""
from typing import List, Dict, Union, TypedDict

class BOMItem(TypedDict):
    """
    A standardized representation of a single item in a Bill of Materials.
    All parsers must convert their source data into this format.
    """
    MPN: str
    Quantity: int
    RefDes: List[str]
    Description: str

class ErrorDict(TypedDict):
    """
    A standardized structure for returning errors from the parsers.
    """
    error: str
    file_path: str

# A Union type to represent the result of a parsing operation, which can
# either be a list of valid BOM items or an error dictionary.
ParseResult = Union[List[BOMItem], ErrorDict]
