<template>
  <el-card class="login">
    <MyForm
      :form-items="formItems"
      v-model:form-data="userAccount"
      :rules="rules"
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
import MyForm from '@/components/my-form/my-form.vue'
import { login } from '@/service/login/login'
import { ElForm } from 'element-plus'
import { ref } from 'vue'
import { formItems, userAccount, rules } from './login.config'
import { showMessageByCode } from '@/utils/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const handleLogin = (formRef: InstanceType<typeof ElForm> | undefined) => {
  formRef?.validate(async (validate) => {
    if (validate) {
      loading.value = true
      const res = await login(userAccount.value) // 登录模块貌似应该放到vuex中
      loading.value = false
      showMessageByCode(res.code, res.msg)
      router.push('/home')
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
