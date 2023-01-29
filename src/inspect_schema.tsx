import { List } from '@raycast/api'
import { Dataset, otDatasets } from "./ot_datasets";
import { useCachedPromise } from '@raycast/utils';

console.log(otDatasets[0].schema_fields)

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
                                icon="ot-icon.png"
                                detail={
                                    <List.Item.Detail markdown="Prueba de detalle" />
                                }
                            />
                    );
                })}
            </List>
    );
}
