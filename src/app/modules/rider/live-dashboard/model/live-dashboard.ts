export class LiveOrderCount {
    liveOrderCount: number;
    pendingOrderCount: number;
    allotedOrderCount: number;
    dispatchedOrderCount: number;
    arrivedOrderCount: number;
    arrivedCustomerDoorStepOrderCount: number;
    cancelledOrderCount: number;
    deliveredOrderCount: number;
    totalOrdersCount: number;
    assignedOrdersCount: number;
    orderLocationCount:OrderLocationCount;

    static fromJson (data: any): LiveOrderCount {
        const o : LiveOrderCount = new LiveOrderCount();
        o['liveOrderCount'] = data['live_orders_count'];
        o['pendingOrderCount'] = data['pending_orders_count'];
        o['allotedOrderCount'] = data['alloted_orders_count'];
        o['dispatchedOrderCount'] = data['dispatched_orders_count'];
        o['arrivedOrderCount'] = data['arrived_orders_count'];
        o['arrivedCustomerDoorStepOrderCount'] = data['arrived_customer_doorstep_orders_count'];
        o['cancelledOrderCount'] = data['cancelled_orders_count'];
        o['deliveredOrderCount'] = data['delivered_orders_count'];
        o['totalOrdersCount'] = data['total_orders_count'];
        o['assignedOrdersCount'] = data['assigned_orders_count'];
        o['orderLocationCount'] = OrderLocationCount.fromJson(data['order_locations_count']);

        return o;
    }
}

export class LiveRiderCount {
    liveRiderCount: number;
    idleRiderCount: number;
    busyRiderCount: number;
    allocatingRiderCount: number;
    offlineRiderCount: number;
    noPingOfflineRiderCount: number;
    noPingWarningRiderCount: number;
    totalRidersCount: number;

    static fromJson(data: any): LiveRiderCount {
        const r : LiveRiderCount = new LiveRiderCount();
        r['liveRiderCount'] = data['live_riders_count'];
        r['idleRiderCount'] = data['idle_riders_count'];
        r['busyRiderCount'] = data['busy_riders_count'];
        r['allocatingRiderCount'] = data['allocating_riders_count'];
        r['offlineRiderCount'] = data['offline_riders_count'];
        r['noPingOfflineRiderCount'] = data['no_ping_offline_riders_count'];
        r['noPingWarningRiderCount'] = data['no_ping_warning_riders_count'];
        r['totalRidersCount'] = data['total_riders_count'];
        return r;
    }
}

export class OrderLocationCount {
    pickupArrivedLocation: number;
    pickupCancelled: number;
    pickupDispatched: number;
    pickupInTransit: number;
    pickupPending: number;
    dropArrivedLocation: number;
    dropCancelled: number;
    dropDelivered: number;
    dropInTransit: number;
    dropPending: number;


    static fromJson(data: any): OrderLocationCount {
        const o: OrderLocationCount = new OrderLocationCount();
        if (data['pickup']) {
            o['pickupArrivedLocation'] = data['pickup']['arrived_location'];
            o['pickupCancelled'] = data['pickup']['cancelled'];
            o['pickupDispatched'] = data['pickup']['dispatched'];
            o['pickupInTransit'] = data['pickup']['in_transit'];
            o['pickupPending'] = data['pickup']['pending'];
        }
        if (data['drop']) {
            o['dropArrivedLocation'] = data['drop']['arrived_location'];
            o['dropCancelled'] = data['drop']['cancelled'];
            o['dropDelivered'] = data['drop']['delivered'];
            o['dropInTransit'] = data['drop']['in_transit'];
            o['dropPending'] = data['drop']['pending'];
        }
        return o;
    }
}