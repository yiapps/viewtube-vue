<template>
  <div class="section-title" @mouseenter="onSectionMouseEnter">
    <h2 :is="link ? 'nuxt-link' : 'h2'" class="title" :to="link">
      {{ title }}
      <ChevronRightIcon v-if="link !== undefined" />
    </h2>
    <span v-if="line" class="line" :class="{ 'heartbeat-animating': heartbeatAnimating }" />
    <img class="heartbeat-animation" src="@/assets/heartbeat.svg" alt="Heartbeat-svg" />
    <slot />
  </div>
</template>

<script lang="ts">
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import GradientBackground from '@/components/GradientBackground.vue';
import Vue from 'vue';
import anime from 'animejs';

export default Vue.extend({
  name: 'SectionTitle',
  components: {
    ChevronRightIcon,
    GradientBackground
  },
  props: {
    title: String,
    link: { type: String, required: false },
    line: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      heartbeatAnimating: false,
      heartbeatTimeout: null
    };
  },
  mounted() {},
  methods: {
    onSectionMouseEnter() {
      if (process.browser) {
        if (!this.heartbeatAnimating) {
          anime({
            targets: '.heartbeat-animation',
            translateX: [
              { value: 0, duration: 0 },
              { value: -500, duration: 4000 }
            ],
            scaleX: [
              { value: 1, duration: 0 },
              { value: 1, duration: 3800 },
              { value: 0, duration: 200 }
            ],
            easing: 'linear'
          });

          this.heartbeatAnimating = true;
          this.heartbeatTimeout = setTimeout(() => {
            this.heartbeatAnimating = false;
          }, 4400);
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.section-title {
  height: 80px;
  overflow: visible;
  position: relative;
  z-index: 9;
  display: block;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .title {
    position: relative;
    top: 0;
    max-width: $main-width;
    margin: 0;
    line-height: 80px;
    font-size: 1.7rem;
    text-align: start;
    padding: 0;
    color: var(--title-color);
    box-sizing: border-box;
    z-index: 9;
    font-weight: bold;

    &:hover {
      .material-design-icon {
        left: -10px !important;
      }
    }

    .material-design-icon {
      height: 0.8em;
      width: 0.8em;
      top: 9px !important;
      height: 1.2em !important;
      width: 1.2em !important;
      left: 0;
      transition: left 300ms $intro-easing;

      .material-design-icon__svg {
        height: 1.2em !important;
        width: 1.2em !important;
        bottom: -9px !important;
      }
    }
  }
  .line {
    height: 2px;
    flex-grow: 1;
    background: linear-gradient(to right, transparent 5%, var(--theme-color-translucent) 15%);
    position: relative;
    top: 50%;
    display: block;
    animation: none;

    &.heartbeat-animating {
      animation: heartbeat-line 4400ms 180ms linear;
    }
  }

  .heartbeat-animation {
    position: absolute;
    right: -230px;
    top: -25.3px;
    width: 230px;
  }
}

@keyframes heartbeat-line {
  0% {
    clip-path: polygon(
      0 0,
      calc(100% - 0) 0,
      calc(100% - 0) 100%,
      calc(100% - 0) 100%,
      calc(100% - 0) 0,
      100% 0,
      100% 100%,
      0% 100%
    );
  }

  35% {
    clip-path: polygon(
      0 0,
      calc(100% - 190px) 0,
      calc(100% - 190px) 100%,
      calc(100% - 0) 100%,
      calc(100% - 0) 0,
      100% 0,
      100% 100%,
      0% 100%
    );
  }

  80% {
    clip-path: polygon(
      0 0,
      calc(100% - 440px) 0,
      calc(100% - 440px) 100%,
      calc(100% - 245px) 100%,
      calc(100% - 245px) 0,
      100% 0,
      100% 100%,
      0% 100%
    );
  }

  100% {
    clip-path: polygon(
      0 0,
      calc(100% - 500px) 0,
      calc(100% - 500px) 100%,
      calc(100% - 500px) 100%,
      calc(100% - 500px) 0,
      100% 0,
      100% 100%,
      0% 100%
    );
  }
}
</style>
