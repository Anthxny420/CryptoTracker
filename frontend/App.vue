
<template>
  <div class="container">
    <div class="top-bar">
      <div class="logo">Logo</div>
      <div class="input-box"><input v-model="form.adresse" placeholder="Adresse transaction" /></div>
      <button :class="{selected: form.type === 'Achat'}" @click="form.type = 'Achat'" class="btn achat">ACHAT</button>
      <button :class="{selected: form.type === 'Vente'}" @click="form.type = 'Vente'" class="btn vente">VENTE</button>
      <div class="input-box"><input type="date" v-model="form.date" /></div>
      <div class="input-box"><input v-model="form.crypto" placeholder="Crypto" /></div>
      <div class="input-box"><input v-model.number="form.montant" type="number" placeholder="Montant" /></div>
      <div class="input-box"><input v-model.number="form.prix" type="number" placeholder="Prix du marché" /></div>
      <button @click="submitTransaction" class="btn">confirmer</button>
    </div>

    <div class="history">
      <div v-for="(t, i) in transactions" :key="i" class="transaction-line">
        {{ t.adresse }} <strong :style="{color: t.type === 'Achat' ? 'green' : 'red'}">{{ t.type }}</strong>
        {{ t.date }} {{ t.crypto.toUpperCase() }} {{ t.montant }} {{ t.prix.toLocaleString() }}€
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  adresse: '',
  type: '',
  date: '',
  crypto: '',
  montant: 0,
  prix: 0
})

const transactions = ref([])

async function submitTransaction() {
  const { adresse, type, date, crypto, montant, prix } = form.value
  if (!adresse || !type || !date || !crypto || !montant || !prix) {
    alert('Merci de remplir tous les champs.')
    return
  }

  const res = await fetch('/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })

  if (res.ok) {
    transactions.value.push({...form.value})
    Object.assign(form.value, { adresse: '', type: '', date: '', crypto: '', montant: 0, prix: 0 })
  }
}
</script>

<style scoped>
.container { font-family: Arial; padding: 1rem; max-width: 1000px; margin: auto; }
.top-bar { display: flex; flex-wrap: wrap; gap: 10px; }
.logo { border: 2px solid black; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; }
.input-box input { border: 2px solid black; padding: 5px; min-width: 120px; }
.btn { padding: 5px 10px; border: none; cursor: pointer; }
.achat { border: 2px solid green; }
.vente { border: 2px solid red; }
.selected { font-weight: bold; }
.history { border: 2px solid black; margin-top: 20px; height: 300px; overflow-y: scroll; padding: 10px; }
.transaction-line { margin: 5px 0; }
</style>
