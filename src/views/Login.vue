<template>
  <form>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="E-mail"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.password"
      :error-messages="v$.password.$errors.map(e => e.$message)"
      :counter="10"
      label="Password"
      required
      @input="v$.password.$touch"
      @blur="v$.password.$touch"
    ></v-text-field>

    <v-btn @click="Sumit" color="primary" class="mt-4">
      Login
    </v-btn>
  </form>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import useResource from '@/composables/useResource'

    
    const { login } = useResource();
  const initialState = {
    password: '',
    email: '',
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    password: { required },
    email: { required },
  }

  const v$ = useVuelidate(rules, state)

  async function Sumit () {
    let val = await v$.value.$validate()
    console.log(val)
      if (!val) return

    let res = await login({email: state.email, password: state.password})
    if(res.data.data.length > 0){
        localStorage.setItem('token', res.data.data[0].token)
        localStorage.setItem('user', JSON.stringify(res.data.data[0]))
        window.location.href = '/'
  
    }
    console.log(res.data.data);
  }
</script>