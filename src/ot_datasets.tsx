
const platform_bucket = "gs://open-targets-pre-data-releases/22.11/output/etl/parquet";
const genetics_bucket = "gs://genetics-portal-dev-data/22.09.0/outputs";
const genetics_dev_bucket = "gs://genetics_etl_python_playground/XX.XX/output/python_etl/parquet";

export interface Dataset {
    name: string;
    type: string;
    location: string;
    schema_fields: Array<any>;
}

export const study_index = [
    {'name': 'studyId', 'type': 'string', 'nullable': false},
    {'name': 'projectId', 'type': 'string', 'nullable': false},
    {
        "name": "discoverySamples",
        "type": {
            "type": "array",
            "elementType": {
            "type": "struct",
            "fields": [
                {
                "name": "sampleSize",
                "type": "string",
                "nullable": true,
                "metadata": {}
                },
                {
                "name": "ancestry",
                "type": "string",
                "nullable": true,
                "metadata": {}
                }
            ]
            },
            "containsNull": true
        },
        "nullable": true,
        "metadata": {}
    },
    {
      "name": "hasSumstats",
      "type": "boolean",
      "nullable": true,
      "metadata": {}
    }
]

export const otDatasets : Dataset[] = [
    { name: "Study index", type: "genetics", location: `${genetics_bucket}/lut/study-index`, schema_fields: study_index },
]
