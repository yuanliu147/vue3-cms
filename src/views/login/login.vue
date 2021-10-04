<template>
  <el-card class="login">
    <MyForm
      :form-items="formItems"
      v-model:form-data="userAccount"
      :rules="rules"
      :layout="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
    >
      <template #header>
        <h2 class="title">vue3-cms</h2>
      </template>
      <template #footer="{ formRef }">
        <el-button
          class="submit"
          type="primary"
          @click="handleLogin(formRef)"
          :loading="loading"
          >登录</el-button
        >
      </template>
    </MyForm>
  </el-card>
</template>

<script lang="ts" setup>
import MyForm from '@/base-components/my-form/my-form.vue'
import { ElForm, ElButton, ElCard } from 'element-plus'
import { ref } from 'vue'
import { formItems, userAccount, rules } from './login.config'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
const router = useRouter()
const store = useStore()
const loading = ref(false)
const handleLogin = (formRef: InstanceType<typeof ElForm> | undefined) => {
  if (loading.value === true) {
    return
  }
  formRef?.validate(async (validate) => {
    if (validate) {
      loading.value = true
      const success = await store.dispatch('loginModule/login', userAccount.value)
      loading.value = false
      success && router.replace('/')
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 400px;
  padding: 30px;
  .title {
    font-size: 50px;
    text-align: center;
  }
  .submit {
    width: 100%;
  }
}
</style>
