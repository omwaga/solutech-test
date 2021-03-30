<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Order Details</div>

                    <div class="card-body">

                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Order</th>
                              <th scope="col">Product</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in details">
                          <th scope="row">#</th>
                          <td v-text="detail.order.order_number"></td>
                          <td v-text="detail.product.name"></td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteDetail(detail.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>

              <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

                <div class="form-group">
                    <label for="order_id">Order:</label>
                    <select class="form-control" name="order_id" v-model="form.order_id">
                        <option value="">Select Order Number</option>
                        <option v-for="order in orders" :value="order.id">{{order.order_number}}</option>
                    </select>
                    <span class="help text-danger" v-if="form.errors.has('order_id')" v-text="form.errors.get('order_id')"></span>
                </div>

                <div class="form-group">
                    <label for="product_id">Select Product:</label>
                    <select class="form-control" name="" v-model="form.product_id">
                        <option value="">Select Product</option>
                        <option v-for="product in products" :value="product.id">{{product.name}}</option>
                    </select>
                    <span class="help text-danger" v-if="form.errors.has('product_id')" v-text="form.errors.get('product_id')"></span>
                </div>

                <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Order Detail</button>
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
            order_id: '',
            product_id: '',
        }),

        details:[],
        orders:[],
        products:[],
    }),

    mounted(){
        this.loadDetails();

        axios.get('/api/all-orders')
        .then(response => this.orders = response.data);

        axios.get('/api/products')
        .then(response => this.products = response.data);
    },

    methods: {
        // Add an Order Detail
        onSubmit() {
            this.form.post('/api/order-details')
            .then(response => alert('Added Successfuly'));

            this.loadDetails();
        },

        // Read Order Details
        loadDetails() {
            axios.get('/api/order-details')
            .then(response => this.details = response.data);
        },

        // Delete Order Detail
        deleteDetail(id){
            this.form.delete('/api/order-details/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadDetails();
        },
    }
}
</script>
