import { ActionPanel, Action, List, Icon } from '@raycast/api'
import { Dataset, otDatasets } from './ot_datasets';
import { useCachedPromise } from '@raycast/utils';

// TODO: error in text when type != string

export default function Command() {
    const { data, isLoading } = useCachedPromise(() => new Promise<Dataset[]>((resolve) => resolve(otDatasets)));

    return (
        <List isLoading={isLoading} isShowingDetail>
            {data &&
                data.map((dataset) => {
                    return (
                            <List.Item
                                key={dataset.name}
                                title={dataset.name}
                                icon={Icon.Tag}
                                actions={
                                    <ActionPanel>
                                        <Action.CopyToClipboard title="Copy location in GCS" content={dataset.location} />
                                    </ActionPanel>
                                }
                                detail={
                                    <List.Item.Detail 
                                        metadata={
                                            <List.Item.Detail.Metadata>
                                                <List.Item.Detail.Metadata.Label title="Schema" />
                                                <List.Item.Detail.Metadata.Separator />
                                                {dataset.schema_fields.map((field) => {
                                                    return (
                                                        <List.Item.Detail.Metadata.Label
                                                            key={field}
                                                            title={field.name}
                                                            icon={field.nullable === true ? Icon.Checkmark : Icon.XMarkCircleFilled}
                                                            text={field.type}
                                                        />
                                                    );
                                                })}
                                            </List.Item.Detail.Metadata>
                                        }
                                    />
                                }
                            />
                    );
                })}
            </List>
    );
}
