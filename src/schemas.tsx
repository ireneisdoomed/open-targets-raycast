import { useState } from 'react';
import { Action, ActionPanel, List } from "@raycast/api";
import { useCachedPromise } from '@raycast/utils';
import schemas from './services/schemas.json';

interface Dataset {
    name: string;
    description: string;
    schema: any;
}

export default function Command() {
    const [showingDetail, setShowingDetail] = useState(true);
    const { data, isLoading } = useCachedPromise(() => new Promise<Dataset[]>((resolve) => resolve(schemas)));
  
    return (
      <List isLoading={isLoading} isShowingDetail={showingDetail}>
        {data &&
          data.map((dataset) => {
            return (
                <List isShowingDetail>
                  <List.Item
                    title={dataset.name}
                    subtitle={dataset.description}
                    detail={
                      <List.Item.Detail markdown="![Illustration](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)" />
                    }
                  />
                </List>
              );
          })}
      </List>
    );
  }
