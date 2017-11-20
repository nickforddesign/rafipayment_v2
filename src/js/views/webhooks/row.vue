<template>
  <tr>
    <td>{{ model.body.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
    <td>
      {{ model.body.topic }}
    </td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

export default {
  name: 'row',
  props: ['model']
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
