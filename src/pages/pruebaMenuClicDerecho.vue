<template>
    <div class="box" @contextmenu="onContextMenu($event)" ></div>
</template>

<script setup>
import ContextMenu from '@imengyu/vue3-context-menu'

function onContextMenu(e) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      { 
        label: "A menu item", 
        onClick: () => {
          alert("You click a menu item");
        }
      },
      { 
        label: "A submenu", 
        children: [
          { label: "Item1" },
          { label: "Item2" },
          { label: "Item3" },
        ]
      },
    ]
  }); 
}
</script>

  <style scoped>
    .box {
        width: 100px;
        height: 100px;
        background-color: red;
    }
</style>