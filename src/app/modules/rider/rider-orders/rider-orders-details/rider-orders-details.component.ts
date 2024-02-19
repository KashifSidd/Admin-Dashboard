import { IManualAllocationOrders, IRemoveRider, OrderLocationDeliveryStatus, OrderLocationDetails, RiderSearchResult } from '../model/rider-order';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { dateLongTimeFormat } from 'src/app/shared/models';
import { RiderService } from 'src/app/shared/services/rider.service';
import { AllocationHistory, DeliveryStatusList, ISettleOrder, RiderManualAllocation, RiderOrder, RiderOrderAction, SettlementStatusList, StatusHistory } from '../model/rider-order';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Roles } from 'src/app/shared/models/constants/constant.type';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RiderOrdersComponent } from '../rider-orders.component';


@Component({
  selector: 'app-rider-orders-details',
  templateUrl: './rider-orders-details.component.html',
  styleUrls: ['./rider-orders-details.component.scss']
})
export class RiderOrdersDetailsComponent implements OnInit {

  @Input() riderOrderDetails: RiderOrder;
  @Input() action: RiderOrderAction;
  @Output() takeAction: EventEmitter<ISettleOrder| IManualAllocationOrders | IRemoveRider> = new EventEmitter();
  orderAllocationHistory: AllocationHistory[] = [];
  orderStatusHistory: StatusHistory[] = [];
  readonly deliveryStatusList = DeliveryStatusList;
  readonly settlementStatusList = SettlementStatusList;
  readonly riderOrderAction = RiderOrderAction;
  readonly dateLongTimeFormat = dateLongTimeFormat;
  showAvailableRiderActionModal: boolean;
  manualAllocationRiderList: RiderManualAllocation[] = [];
  settlementAmt = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  showRiderSearchModal: boolean;
  noRiderSearchLogs: boolean;
  zoom: number = 10;
  pickupLat: number;
  pickupLong: number;
  removeRiderReason = new FormControl('', [Validators.required]);
  readonly Roles = Roles;
  showAcceptOrderOnRiderBehalfBtn: boolean;
  showDeliveryStatusUpdateTable: boolean;
  readonly orderLocationDeliveryStatus = OrderLocationDeliveryStatus;
  selectedDeliveryStatus: { [key: number]: string } = {};
  showOrderLocationDeliveryStatusUpdate: { [key: number]: boolean } = {};
  allowedDeliveryStatusOptions: { [locationId: number]: { key: string; value: string }[] } = {};

  constructor(private riderService: RiderService, private renderer: Renderer2, private toastMsgService: ToastService, private dialog: MatDialog, private sharedService: SharedService, private parent: RiderOrdersComponent) { }

  ngOnInit(): void {
    this.getOrderAllocationHistory();
    this.getOrderStatusHistory();
    const o = this.riderOrderDetails.orderLocation.find(o => o.type === 'pickup')
    this.pickupLat = o.lat;
    this.pickupLong = o.long;
    this.canShowAcceptOnRiderBehalfBtn();
    this.canShowOrderLocationDeliveryStatusUpdateTable();
    this.canShowOrderLocationDeliveryStatusUpdate();
  }

  /**
   * Method that gets allocation history of order
   */
  getOrderAllocationHistory() {
    this.riderService.getOrderAllocationHistory(this.riderOrderDetails.orderId).subscribe(res => {
      for (const i of res['result']) {
        const allocationHistory = AllocationHistory.fromJson(i);
        this.orderAllocationHistory.push(allocationHistory);
      }

    })
  }

  /**
   * Metohd that gets status history of order
   */
  getOrderStatusHistory() {
    this.riderService.getOrderStatusHistory(this.riderOrderDetails.orderId).subscribe(res => {
      for (const i of res['result']) {
        this.orderStatusHistory.push(StatusHistory.fromJson(i));
      }
    })
  }

  /**
   * Method that show the list of available riders
   */
  getAvailableRidersForManuallyAllocating() {
    this.riderService.getAvailableRidersForManuallyAssigning(this.riderOrderDetails.orderId).subscribe(res => {
      this.manualAllocationRiderList = [];
      for (const i of res['result']) {
        this.manualAllocationRiderList.push(RiderManualAllocation.fromJson(i));
      }
    })
  }

  /**
   * Method that open the modal of available riders
   */
  openAvailableRiderModal() {
    this.showAvailableRiderActionModal = true;
    this.renderer.addClass(document.body, 'overlay-enabled');
    this.getAvailableRidersForManuallyAllocating();
  }

  /**
   * Method to close the available riders modal
   */
  closeAvailableRiderModal() {
    this.showAvailableRiderActionModal = false;
    this.renderer.removeClass(document.body, 'overlay-enabled');
  }

  /**
   * emits settlement data 
   * @returns 
   */
  onConfirm() {
    if (this.settlementAmt.status === 'INVALID') return this.settlementAmt.markAsTouched();
    this.takeAction.emit({ orderId: this.riderOrderDetails.orderId, settlementAmt: this.settlementAmt.value });
  }

  /**
   * resets formcontrol
   */
  onClear() {
    this.settlementAmt.reset();
  }

  /**
   * Method that sends rider and order id based on action taken to parent component
   * @param riderId 
   */
  onRiderAllocation(riderId: string){
    this.takeAction.emit({orderId: this.riderOrderDetails.orderId, riderId: riderId});
    this.closeAvailableRiderModal();
  }

  /**
   * Method that emits data to remove rider from the order
   * @returns 
   */
  onRemoveRider() {
    if (this.removeRiderReason.status === 'INVALID') return this.removeRiderReason.markAsTouched();
    this.takeAction.emit({ orderId: this.riderOrderDetails.orderId, reason: this.removeRiderReason.value });
  }

  /**
   * Method that clears the fromControl
   */
  onRemoveRiderReasonClear() {
    this.removeRiderReason.reset();
  }

  /**
   * Open Rider Search Results logs modal
   */
  openRiderSearchResultModal(){
    this.showRiderSearchModal = true;
  }

  /**
   * Close Rider Search Result logs modal
   */
  closeRiderSearchResultModal(){
    this.showRiderSearchModal = false;
  }

  /**
   * Method that opens up google map and shows distance between outlet and rider
   * @param riderlat 
   * @param riderLng 
   */
  openMapfromPickupLocationToRiderDistance(riderlat:number, riderLng:number){
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.pickupLat},${this.pickupLong}
    &destination=${riderlat},${riderLng}&travelmode=driving`;
    window.open(url, '_blank');
}

/**
 * Method that Opens a confirmation dialog to confirm the acceptance of a rider order.
 * If the user confirms, updates the rider order status through the rider service,
 */
acceptRiderOrder(orderId: any, riderId: any) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      title: 'Are you sure ?',
      message: `You are about to accept the order id:  ${this.riderOrderDetails.orderId} on behalf of rider.`,
      confirmBtnText: 'OK',
      dismissBtnText: 'Cancel'
    }
  })
  dialogRef.afterClosed().subscribe(response => {
    if(response) {
      const data = {
        rider_id: riderId,
      };
      this.riderService.postUpdateRiderOrder(orderId, data).subscribe(res => {
        this.toastMsgService.showSuccess(`Order ID: ${orderId} has been accepted`);
        this.riderOrderDetails.deliveryStatus = this.deliveryStatusList[res.result.delivery_status];
        this.getOrderAllocationHistory();
        this.showAcceptOrderOnRiderBehalfBtn = false;
      });
    }
  })
}

/**
 * Method that Determines whether the "Accept Order" button should be displayed based on specific conditions.
 * Conditions include the delivery status, rider order action, and user roles.
 */
canShowAcceptOnRiderBehalfBtn() {
  this.showAcceptOrderOnRiderBehalfBtn = this.riderOrderDetails.deliveryStatus === this.deliveryStatusList.ASSIGNED &&
  this.action !== this.riderOrderAction.ManualAssignment &&
  [Roles.superadmin].some(r => this.sharedService.roles.includes(r));
}

/**
 * Method that Determines whether the order location delivery status update table should be displayed.
 */
canShowOrderLocationDeliveryStatusUpdateTable() {
  this.showDeliveryStatusUpdateTable = (
    (this.riderOrderDetails.deliveryStatus !== this.deliveryStatusList.CANCELLED && this.riderOrderDetails.deliveryStatus !== this.deliveryStatusList.DELIVERED) &&
    this.action !== this.riderOrderAction.ManualAssignment && 
    this.action !== this.riderOrderAction.Settle && 
    this.sharedService.roles.includes(Roles.superadmin)
  );
}

/**
 * Method that checks and updates the visibility of order location delivery status update based on delivery status and type.
 */
canShowOrderLocationDeliveryStatusUpdate() {
  for (const i of this.riderOrderDetails.orderLocation) {
    const isPickup = i.type === 'pickup';
    this.showOrderLocationDeliveryStatusUpdate[i.id] =
      (i.deliveryStatus === this.orderLocationDeliveryStatus.PENDING ||
        i.deliveryStatus === this.orderLocationDeliveryStatus.ARRIVED_LOCATION ||
        i.deliveryStatus === this.orderLocationDeliveryStatus.IN_TRANSIT ||
        i.deliveryStatus === this.deliveryStatusList.ALLOTTED);

    this.allowedDeliveryStatusOptions[i.id] = this.filterDeliveryStatusOptions(isPickup);
  }
}

/**
 * Method that filters the available delivery status options based on the order location type (pickup or not).
 */
filterDeliveryStatusOptions(isPickup: boolean): { key: string; value: string }[] {
  const filteredOptions = Object.entries(this.orderLocationDeliveryStatus)
    .filter(([key]) => (isPickup && key !== 'DELIVERED') || (!isPickup && key !== 'DISPATCHED'))
    .map(([key, value]) => ({ key, value }));
  
  return filteredOptions;
}

/**
 * Method that Updates the order location delivery status for a specific order location and handles special cases like 'DELIVERED', 'DISPATCHED', and 'CANCELLED'.
 *
 * @param {number} locationId - The unique identifier of the order location.
 * @param {number} index - The index of the order location in the list.
 */  
updateOrderLocationDeliveryStatus(locationId: number, index: number) {
    const deliveryStatus = this.selectedDeliveryStatus[locationId];
    const data: any = {
      delivery_status: deliveryStatus,
      order_location_id: locationId,
    };

    if (deliveryStatus === 'DELIVERED' || deliveryStatus === 'DISPATCHED') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure?',
          message: `You are about to mark ${deliveryStatus} for the order location Id: ${locationId} on behalf of the rider. POD of ${this.riderOrderDetails.orderLocation[index].clientPodAmount} will be added in assigned riders pod collection.`,
          confirmBtnText: 'OK',
          dismissBtnText: 'Cancel'
        }
      });

      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          data.pod_status = 'completed';
          this.performUpdateOrderLocationDeliveryStatus(data, index);
        }
      });
    } else if (deliveryStatus === 'CANCELLED') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure?',
          message: `You are about to cancel the order id: ${this.riderOrderDetails.orderId}. Please provide a reason below:`,
          inputLabel: 'Cancellation Reason',
          inputPlaceholder: 'Enter cancellation reason',
          inputRequired: true,
          confirmBtnText: 'OK',
          dismissBtnText: 'Cancel'
        }
      });

      dialogRef.afterClosed().subscribe((response: { confirmed: boolean, cancellationReason: string }) => {
        if (response && response.confirmed) {
          data.cancellation_reason = response.cancellationReason;
          this.performUpdateOrderLocationDeliveryStatus(data, index);

        }
      });
    } else {
      this.performUpdateOrderLocationDeliveryStatus(data, index);

    }
  }

  /**
 * Method that Performs the actual update of the order location delivery status by making a PUT request to the rider service.
 */
  performUpdateOrderLocationDeliveryStatus(data: any, index: number) {
    this.riderService.putRiderLocationUpdate(this.riderOrderDetails.orderId, data)
      .subscribe(res => {
        const locationId = data.order_location_id;
        this.toastMsgService.showSuccess(`Delivery status for order location Id: ${locationId} has been updated.`);
  
        for (const updateOrderLocationsDetails of this.riderOrderDetails.orderLocation) {
          const updatedOrderLocationsDetails = res.result.order_locations.find(i => i.id === updateOrderLocationsDetails.id);
          if (updatedOrderLocationsDetails) {
            Object.assign(updateOrderLocationsDetails, OrderLocationDetails.fromJson(updatedOrderLocationsDetails));
          }
        }
  
        this.canShowOrderLocationDeliveryStatusUpdate();
        this.canShowOrderLocationDeliveryStatusUpdateTable();
        this.selectedDeliveryStatus[locationId] = null;
        this.riderOrderDetails.deliveryStatus = this.deliveryStatusList[res.result.delivery_status];
      });
  }
  

}
