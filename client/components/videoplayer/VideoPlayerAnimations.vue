<template>
  <div class="player-animations-container">
    <div class="player-animation skip-forward" :class="{ visible: animations.skipForward }">
      <ArrowRightIcon />
    </div>
    <div class="player-animation skip-backward" :class="{ visible: animations.skipBackward }">
      <ArrowLeftIcon />
    </div>
    <div class="player-animation volume-up" :class="{ visible: animations.volumeUp }">
      <VolumeHighIcon />
    </div>
    <div class="player-animation volume-down" :class="{ visible: animations.volumeDown }">
      <VolumeLowIcon />
    </div>
  </div>
</template>

<script lang="ts">
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue';
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';
import VolumeHighIcon from 'vue-material-design-icons/VolumeHigh.vue';
import VolumeLowIcon from 'vue-material-design-icons/VolumeLow.vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
    ArrowRightIcon,
    ArrowLeftIcon,
    VolumeHighIcon,
    VolumeLowIcon
  },
  props: {
    animations: Object
  }
});
</script>

<style lang="scss">
.player-animations-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 200;
  pointer-events: none;
  user-select: none;
  display: flex;

  .player-animation {
    margin: auto 0;
    width: 60px;
    height: 60px;
    position: relative;
    display: none;

    &.visible {
      display: block;
    }

    .material-design-icon,
    .material-design-icon__svg {
      width: 60px;
      height: 60px;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      border-radius: 50px;
      background-color: #00000073;
      width: 80px;
      height: 80px;
      top: -10px;
      left: -10px;
    }
  }

  .skip-forward {
    margin: auto 0 auto 60%;
    animation: anim-float-right 300ms $intro-easing forwards;
  }

  .skip-backward {
    margin: auto 0 auto 40%;
    animation: anim-float-left 300ms $intro-easing forwards;
  }

  .volume-up {
    margin: auto;
    animation: anim-float-up 300ms $intro-easing forwards;
  }

  .volume-down {
    margin: auto;
    animation: anim-float-down 300ms $intro-easing forwards;
  }
}

@keyframes anim-float-right {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(200px);
  }
}
@keyframes anim-float-left {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-200px);
  }
}
@keyframes anim-float-up {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-200px);
  }
}
@keyframes anim-float-down {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(200px);
  }
}
</style>
