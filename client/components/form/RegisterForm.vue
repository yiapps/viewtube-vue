<template>
  <div class="register-form" :class="{ loading: loading, wiggle: formWiggle }">
    <h2 class="register-title">Sign up</h2>
    <span class="status-message-display message-display">{{ statusMessage }}</span>
    <Spinner />
    <form id="register" ref="registerForm" method="post" @submit.prevent="register">
      <FormInput :id="'username'" v-model="username" :label="'username'" :type="'username'" />
      <FormInput :id="'password'" v-model="password" :label="'password'" :type="'password'" />
      <FormInput
        :id="'repeat-password'"
        v-model="repeatPassword"
        :label="'Repeat password'"
        :type="'password'"
      />
      <div class="captcha-container">
        <div class="captcha-box">
          <img class="captcha-image" :src="captchaImage" alt="Captcha image" />
        </div>
      </div>
      <FormInput
        :id="'image-captcha'"
        v-model="captchaSolution"
        :label="'Captcha'"
        :type="'text'"
      />
      <SubmitButton :label="'Sign up'" />
    </form>
  </div>
</template>

<script lang="ts">
import FormInput from '@/components/form/FormInput.vue';
import SubmitButton from '@/components/form/SubmitButton.vue';
import Spinner from '@/components/Spinner.vue';
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useRouter,
  watch
} from '@nuxtjs/composition-api';
import { useAccessor } from '@/store';

export default defineComponent({
  name: 'RegisterForm',
  components: {
    FormInput,
    SubmitButton,
    Spinner
  },
  props: {
    complete: Function
  },
  setup(props) {
    const route = useRoute();
    const accessor = useAccessor();
    const router = useRouter();

    const loading = ref(false);
    const username = ref(null);
    const password = ref(null);
    const repeatPassword = ref(null);
    const captchaSolution = ref(null);
    const statusMessage = ref('');
    const errorMessage = ref('');
    const redirectedPage = ref('home');
    const formWiggle = ref(false);

    const captchaImage = computed(() => {
      return accessor.captcha.image;
    });

    watch(password, () => {
      checkRepeatPasswords();
    });
    watch(repeatPassword, () => {
      checkRepeatPasswords();
    });

    const register = async () => {
      if (password.value !== repeatPassword.value) {
        wiggleRegisterForm();
      } else {
        loading.value = true;

        const user = await accessor.user.register({
          username: username.value,
          password: password.value,
          captchaSolution: captchaSolution.value
        });
        if (user && !user.error && user.username) {
          accessor.messages.createMessage({
            type: 'info',
            title: 'Registration successful',
            message: `Welcome, ${user.username}`
          });
          if (props.complete && typeof props.complete === 'function') {
            props.complete();
          } else {
            router.push((route.value.query.ref as string) || '/');
          }
        } else {
          accessor.messages.createMessage({
            type: 'error',
            title: 'Registration failed',
            message: user ? user.error : ''
          });
          loading.value = false;
          wiggleRegisterForm();
          accessor.captcha.getCaptcha();
        }
      }
    };
    const wiggleRegisterForm = () => {
      formWiggle.value = true;
      setTimeout(() => {
        formWiggle.value = false;
      }, 600);
    };
    const checkRepeatPasswords = () => {
      if (password.value !== repeatPassword.value) {
        statusMessage.value = 'passwords do not match';
      } else {
        statusMessage.value = '';
      }
    };

    accessor.captcha.getCaptcha();

    return {
      loading,
      username,
      password,
      repeatPassword,
      captchaSolution,
      statusMessage,
      errorMessage,
      redirectedPage,
      formWiggle,
      captchaImage,
      register
    };
  }
});
</script>

<style lang="scss">
.register-form {
  margin: auto;
  width: 100%;
  max-width: 500px;
  background-color: var(--bgcolor-alt);
  box-shadow: $max-shadow;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  @media screen and (max-width: $mobile-width) {
    height: auto;
    box-shadow: none;
  }

  &.wiggle {
    animation: wiggle 600ms;
  }

  .register-title {
    margin: 20px 0 0 0;
    font-size: 2rem;
    color: var(--theme-color);
    font-family: $default-font;
  }

  .message-display {
    height: 20px;
    line-height: 20px;

    &.error-message-display {
      color: var(--error-color-red);
    }
  }

  &.loading {
    #register {
      opacity: 0;
      pointer-events: none;
    }

    .spinner {
      opacity: 1;
    }
  }

  .spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 300ms $intro-easing;
  }

  #register {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 10000px;
    max-width: 500px;
    padding: 10px;
    box-sizing: border-box;
    transition: opacity 300ms $intro-easing;

    .captcha-container {
      width: calc(100% - 40px);
      display: flex;
      margin: 20px 20px;
      height: auto;

      .captcha-box {
        border: 2px solid var(--bgcolor-alt-light);
        width: 100%;
        background-color: transparent;
        color: var(--subtitle-color-light);
        border-radius: 4px;
        overflow: hidden;

        .captcha-image {
          width: 100%;
          filter: var(--darkness);
          margin: -10px 0;
        }
      }
    }
  }
}

@keyframes wiggle {
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translate(10px);
  }
}
</style>
