<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Supplier Products </div>

          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Product</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(supplier_product, index) in supplier_products">
                  <th scope="row">#</th>
                  <td v-text="supplier_product.supplier.name"></td>
                  <td v-text="supplier_product.product.name"></td>
                  <td><button class="btn btn-danger btn-sm" @click="deleteSupplierProduct(supplier_product.id)">Delete</button></td>
                </tr>
              </tbody>
            </table>


            <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

              <div class="form-group">
                <label for="supply_id">Supplier:</label>
                <select class="form-control" name="supply_id" v-model="form.supply_id">
                  <option value="">Select Supplier</option>
                  <option v-for="supplier in suppliers" :value="supplier.id">{{supplier.name}}</option>
                </select>
                <span class="help text-danger" v-if="form.errors.has('supply_id')" v-text="form.errors.get('supply_id')"></span>
              </div>

              <div class="form-group">
                <label for="product_id">Select Product:</label>
                <select class="form-control" name="" v-model="form.product_id">
                  <option value="">Select Product</option>
                  <option v-for="product in products" :value="product.id">{{product.name}}</option>
                </select>
                <span class="help text-danger" v-if="form.errors.has('product_id')" v-text="form.errors.get('product_id')"></span>
              </div>

              <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Supplier Product</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Form from '../form';

export default {
  data: () => ({
    form: new Form({
      'supply_id':'',
      'product_id':'',
    }),

    supplier_products:[],
    suppliers:[],
    products:[],
  }),

  mounted(){
    this.loadSupplierProducts();

    axios.get('/api/suppliers')
    .then(response => this.suppliers = response.data);

    axios.get('/api/products')
    .then(response => this.products = response.data);
  },

  methods: {
    // Add a Supplier Product
    onSubmit() {
      this.form.post('/api/supplier-products')
      .then(response => alert('Added Successfuly'));
      this.loadSupplierProducts();
    },

        // Read Supplier Products
        loadSupplierProducts() {
          axios.get('/api/supplier-products')
          .then(response => this.supplier_products = response.data);
        },

        // Delete Supplier Products
        deleteSupplierProduct(id){
          axios.delete('/api/supplier-products/' + id)
          .then(response => alert('Deleted Successfuly'));

          this.loadSupplierProducts();
        },
      }
    }
    </script>
