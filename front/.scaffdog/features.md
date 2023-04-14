---
name: "feature"
root: "./features/"
output: "**/*"
ignore: []
questions:
  name: "Please enter the name of the feature (eg. footer)"
---

# `{{ inputs.name | pascal }}/index.tsx`

```tsx
import { FC } from 'react'

type Props =  {}

export const {{ inputs.name | pascal }}:FC<Props> = ({}) => {

  return <></>
}
```
