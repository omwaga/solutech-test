<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">CRUD API</div>
                    <div class="card-body">
                    	<div class="row">

                    		<div class="col-md-3	 shadow-sm p-3 m-3">
                    			<h5><router-link :to="{name: 'suppliers'}">Suppliers</router-link></h5>
                    		</div>

                    		<div class="col-md-3 shadow-sm p-3 m-3">
                    			<h5><router-link :to="{name: 'orders'}">Orders</router-link></h5>
                    		</div>

                    		<div class="col-md-3 shadow-sm p-3 m-3">
                    			<h5><router-link :to="{name: 'products'}">Products</router-link></h5>
                    		</div>

                    		<div class="col-md-3 shadow-sm p-3 m-3">
                    			<h5><router-link :to="{name: 'suppliers.products'}">Suplier Products</router-link></h5>
                    		</div>

                    		<div class="col-md-3 shadow-sm p-3 m-3">
                    			<h5><router-link :to="{name: 'order.details'}">Order Details</router-link></h5>
                    		</div>
                    	</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>
