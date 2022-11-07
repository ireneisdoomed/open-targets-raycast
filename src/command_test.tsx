import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { run } from './api';


const input = 'PCSK9'

async function fetchData(input: string) {
  const response = await run(input)
  const items = [
    {
      title: 'Button',
      url: response
    },
  ]
  console.log(items);
  return items;
}

export default async function Command(input: string) {
  const items = fetchData(input);
  return (
    <List searchBarPlaceholder="Enter a gene name...">
      {(await items).map((item) => (
        <List.Item
          key={item.title}
          icon={{ source: Icon.Link }}
          title={item.title}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}