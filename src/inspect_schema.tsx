import { ActionPanel, Action, List, Icon } from '@raycast/api'
import { Dataset, otDatasets } from './ot_datasets';
import { useCachedPromise } from '@raycast/utils';

type DataType = { id: string; name: string };

function DatatypeDropdown(props: { datatypes: DataType[]; onDatatypeChange: (newValue: string) => void }) {
    const { datatypes, onDatatypeChange } = props;
    return (
      <List.Dropdown
        tooltip="Select Drink Type"
        storeValue={true}
        onChange={(newValue) => {
            onDatatypeChange(newValue);
        }}
      >
        <List.Dropdown.Section title="Alcoholic Beverages">
          {datatypes.map((datatypes) => (
            <List.Dropdown.Item key={datatypes.id} title="Data type" value={datatypes.name} />
          ))}
        </List.Dropdown.Section>
      </List.Dropdown>
    );
  }

export default function Command() {
    const { data, isLoading } = useCachedPromise(() => new Promise<Dataset[]>((resolve) => resolve(otDatasets)));
    const datatypes: [] = [
        { id: "1", name: "Platform" },
        { id: "2", name: "Genetics" },
        { id: "3", name: "Genetics (dev)" },
      ];
    const onDatatypeChange = (newValue: string) => {
        console.log(newValue);
      };
    return (
        <List isLoading={isLoading} isShowingDetail>
            searchBarAccessory={<DatatypeDropdown datatypes={datatypes} onDatatypeChange={onDatatypeChange} />}
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
                                                            text={typeof field.type === 'string' ? field.type : field.type.type}
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
