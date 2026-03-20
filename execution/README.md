# Execution Layer (Layer 3)

This directory contains deterministic Python scripts that do the actual work.

## Guidelines
- Scripts should be focused and perform a single task.
- Use environment variables from the root `.env` file.
- Handle errors gracefully and return meaningful output/status codes.
- These scripts are called by the Orchestration layer (the Agent).

## Example Template
```python
import os
import sys

def main():
    # Load env, perform logic, print result
    print("Execution successful")

if __name__ == "__main__":
    main()
```
