import json

from pathlib import Path

core_schema = json.loads(
    Path("/Users/irenelopez/Documents/dev/raycast/open-targets-raycast/src/services", "schemas.json").read_text(encoding="utf-8")
)
schema_fields = [{k: v for k, v in field.items() if k != "metadata"} for field in core_schema["fields"]]

