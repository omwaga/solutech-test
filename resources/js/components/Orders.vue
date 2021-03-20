<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Orders</div>

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
                        <tr v-for="(order, index) in orders">
                          <th scope="row">#</th>
                          <td v-text="order.order_number"></td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>

              <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="form-group">
                    <label for="name">Order Number:</label>
                    <input type="text" name="order_number" class="form-control form-control-sm" v-model="form.order_number" placeholder="Order Number" required="">
                    <span class="help text-danger" v-if="form.errors.has('order_number')" v-text="form.errors.get('order_number')"></span>
                </div>
                <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Supplier</button>
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
            order_number: '',
        }),

        orders:[],
    }),

    mounted() {
        this.loadOrders();
    },

    methods: {
        // Add a supplier
        onSubmit() {
            this.form.post('/api/all-orders')
            .then(response => alert('Added Successfuly'));

            this.loadOrders();
        },

        // Read Orders
        loadOrders() {
            axios.get('/api/all-orders')
            .then(response => this.orders = response.data);
        },

        // Delete Orders
        deleteOrder(id){
            axios.delete('/api/all-orders/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadOrders();
        },
    }
}
</script>
