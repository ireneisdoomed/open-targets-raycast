
export interface Dataset {
    name: string;
    type: string;
    schema_fields: Array<any>;
}

export const study_index = [
    {'name': 'studyId', 'type': 'string', 'nullable': false},
    {'name': 'projectId', 'type': 'string', 'nullable': false}
]

export const otDatasets : Dataset[] = [
    { name: "Study index", type: "genetics", schema_fields: study_index },
]