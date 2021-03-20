<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Products</div>

                    <div class="card-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in all_products">
                          <th scope="row">#</th>
                          <td v-text="product.name"></td>
                          <td v-text="product.quantity"></td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>

              <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

                <div class="form-group">
                    <label for="name">Product Name:</label>
                    <input type="text" name="name" class="form-control form-control-sm" v-model="form.name" placeholder="Name" required="">
                    <span class="help text-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
                </div>

                <div class="form-group">
                    <label for="description">Product Description:</label>
                    <input type="text" name="description" class="form-control form-control-sm" v-model="form.description" placeholder="Description" required="">
                    <span class="help text-danger" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
                </div>

                <div class="form-group">
                    <label for="quantity">Product Quantity:</label>
                    <input type="text" name="quantity" class="form-control form-control-sm" v-model="form.quantity" placeholder="Quantity" required="">
                    <span class="help text-danger" v-if="form.errors.has('quantity')" v-text="form.errors.get('quantity')"></span>
                </div>

                <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Product</button>
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
            name: '',
            description: '',
            quantity: '',
        }),

        all_products:[],
    }),

    mounted(){
        this.loadProducts();
    },

    methods: {
        // Add a Product
        onSubmit() {
            this.form.post('/api/products')
            .then(response => alert('Added Successfuly'));

            this.loadProducts();
        },

        // Read Products
        loadProducts() {
            axios.get('/api/products')
            .then(response => this.all_products = response.data);
        },

        // Delete Products
        deleteProduct(id){
            axios.delete('/api/products/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadProducts();
        },
    }
}
</script>
