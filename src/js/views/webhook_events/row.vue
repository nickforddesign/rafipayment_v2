<template>
  <tr>
    <td>{{ model.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
    <td>
      {{ model.topic }}
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
