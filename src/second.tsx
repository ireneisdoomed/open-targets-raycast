import { Action, ActionPanel, Icon, List } from '@raycast/api'

var gene = "PCSK9"

const items = [
  {
    title: 'Button',
    url: `https://platform.opentargets.org/search?q=${gene}&page=1`
  },
]

export default function Command() {
  return (
    <List searchBarPlaceholder="Enter a gene name...">
      {items.map((item) => (
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