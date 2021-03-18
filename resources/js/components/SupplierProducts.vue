<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Supplier Products <router-link class="float-right" :to="{name: 'suppliers'}">Supliers</router-link></div>

                    <div class="card-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(supplier_product, index) in supplier_products">
                          <th scope="row">#</th>
                          <td v-text="supplier_product.id">Mark</td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteSupplierProduct(supplier_product.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'

export default {

    data: () => ({
        supplier_products:[],
    }),

    mounted(){
        this.loadSupplierProducts();
    },

    methods: {
        onSubmit() {
            this.form.post('/api/supplier-products')
            .then(response => alert('Added Successfuly'));
            this.loadSupplierProducts();
        },

        // Read Suppliers
        loadSupplierProducts() {
            axios.get('/api/supplier-products')
            .then(response => this.supplier_products = response.data);
        },

        // Delete Suppliers
        deleteSupplierProduct(id){
            axios.delete('/api/supplier-products/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadSuppliers();
        },
    }
}
</script>
