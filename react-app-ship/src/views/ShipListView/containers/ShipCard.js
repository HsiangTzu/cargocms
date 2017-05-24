import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui/Card';
import ShipCardBody from './ShipCardBody';
import ShipCardDetail from '../components/ShipCardDetail';

export default class ShipCard extends React.Component {
  static defaultProps = {
    toast: null,
    shipOrderNumber: '2017010101111crc',
    invoiceNo: 1111222233334444,
    invoicePrefix: 'S',
    displayName: '潘仔',
    createdDateTime: {
      dateTime: '2016/12/20 17:22',
      date: '2016/12/20',
      time: '17:22:00',
    },
    updatedDateTime: {
      dateTime: '2016/12/21 11:43',
      date: '2016/12/21',
      time: '11:43:00',
    },
    SupplierShipOrderProducts: [
      {
        id: 3,
        name: '鮮甜飽滿無毒益菌蝦',
        model: '鮮甜飽滿無毒益菌蝦',
        quantity: 22,
        price: 599,
        total: 13178,
        tax: 658.9,
        status: 'NEW',
        OrderProductId: 1,
        SupplierShipOrderId: 3,
      },
    ],
    telephone: '0987654321',
    email: 'testOrder@example.com',
    paymentCompany: '',
    paymentAddress1: '台灣城市的某個街道隨機號',
    paymentAddress2: '',
    paymentCity: 'taichung',
    paymentPostcode: '402',
    paymentCountry: '',
    paymentCountryId: '0',
    paymentZone: '',
    paymentZoneId: '0',
    paymentAddressFormat: '',
    paymentCustomField: '',
    paymentMethod: 'ATM',
    paymentCode: '808080808080',
    shippingFirstname: '歐德',
    shippingLastname: '泰',
    shippingAddress1: '台灣城市的某個街道隨機號',
    shippingAddress2: '',
    shippingCity: 'taichung',
    shippingPostcode: '402',
    shippingCountry: '',
    shippingCountryId: '0',
    shippingZone: '',
    shippingZoneId: '0',
    shippingAddressFormat: '',
    shippingCustomField: '',
    shippingMethod: '郵局遞送',
    shippingCode: '123456789009876',
    comment: 'no comment',
    total: 123456,
    tracking: '確認訂單',
    status: 'NEW',
    OrderId: 1,
    Supplier: {
      id: 1,
      name: '壹陸捌活海產',
      email: '168_seafood@gmail.com',
      telephone: '(04)-2201-1688',
      fax: '(04)-2201-1168',
      address: '台中市清水區北提路',
    },
    Order: {
      id: 1,
      orderNumber: 'n/a',
    },
  };

  static propTypes = {
    toast: PropTypes.func,
    id: PropTypes.number,
    shipOrderNumber: PropTypes.string,
    invoiceNo: PropTypes.string,
    invoicePrefix: PropTypes.string,
    displayName: PropTypes.string,
    createdDateTime: PropTypes.object,
    updatedDateTime: PropTypes.object,
    SupplierShipOrderProducts: PropTypes.array,
    telephone: PropTypes.string,
    email: PropTypes.string,
    paymentCompany: PropTypes.string,
    paymentAddress1: PropTypes.string,
    paymentAddress2: PropTypes.string,
    paymentCity: PropTypes.string,
    paymentPostcode: PropTypes.string,
    paymentCountry: PropTypes.string,
    paymentCountryId: PropTypes.string,
    paymentZone: PropTypes.string,
    paymentZoneId: PropTypes.string,
    paymentAddressFormat: PropTypes.string,
    paymentCustomField: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentCode: PropTypes.string,
    shippingFirstname: PropTypes.string,
    shippingLastname: PropTypes.string,
    shippingAddress1: PropTypes.string,
    shippingAddress2: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingPostcode: PropTypes.string,
    shippingCountry: PropTypes.string,
    shippingCountryId: PropTypes.string,
    shippingZone: PropTypes.string,
    shippingZoneId: PropTypes.string,
    shippingAddressFormat: PropTypes.string,
    shippingCustomField: PropTypes.string,
    shippingMethod: PropTypes.string,
    shippingCode: PropTypes.string,
    comment: PropTypes.string,
    total: PropTypes.number,
    tracking: PropTypes.string,
    status: PropTypes.string,
    OrderId: PropTypes.number,
    Supplier: PropTypes.object,
    regularTotal: PropTypes.string,
    formatTax: PropTypes.string,
    Order: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleCardExpend = () => {
    const openState = this.state.open;
    this.setState({ open: !openState });
  }

  stopPropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const props = this.props;
    const cardBody = {
      isExpend: this.state.open,
      invoiceCode: props.invoicePrefix + props.invoiceNo,
      orderDetail: props.SupplierShipOrderProducts,
      orderSupplier: props.Supplier,
      ordrDate: {
        createdAt: props.createdDateTime.date,
        updatedAt: props.updatedDateTime.date,
      },
      total: props.total,
      status: props.status,
    };
    const cardDetail = {
      telephone: props.telephone,
      paymentMethod: props.paymentMethod,
      shippingName: props.shippingLastname + props.shippingFirstname,
      shippingMethod: props.shippingMethod,
      shippingAddress: `${props.shippingPostcode} ${props.shippingCity}${props.shippingAddress1}`,
      tracking: props.tracking,
      comment: props.comment,
      regularTotal: props.regularTotal,
      formatTax: props.formatTax,
      orderNumber: this.props.Order.orderNumber
    };
    return (
      <Card
        className='card'
        expanded={this.state.open}
        onClick={this.handleCardExpend}
      >
        <ShipCardBody
          // toast func
          toast={this.props.toast}
          shipOrderId={this.props.id}
          shipOrderNumber={this.props.shipOrderNumber}
          isExpend={cardBody.isExpend}
          invoiceCode={cardBody.invoiceCode}
          orderDetail={cardBody.orderDetail}
          orderDate={cardBody.ordrDate}
          total={cardBody.total}
          orderSupplier={cardBody.orderSupplier}
          status={cardBody.status}
        />
        <CardActions>{}</CardActions>
        <CardText
          onClick={this.stopPropagation}
          className='card-detail-wrapper'
          expandable={true}
        >
          <ShipCardDetail
            // toast func
            toast={this.props.toast}
            // same as cardBody
            shipOrderNumber={this.props.shipOrderNumber}
            shipOrderId={this.props.id}
            isExpend={cardBody.isExpend}
            invoiceCode={cardBody.invoiceCode}
            orderDetail={cardBody.orderDetail}
            orderDate={cardBody.ordrDate}
            total={cardBody.total}
            orderSupplier={cardBody.orderSupplier}
            status={cardBody.status}
            // for CardDetail
            telephone={cardDetail.telephone}
            paymentMethod={cardDetail.paymentMethod}
            shippingName={cardDetail.shippingName}
            shippingAddress={cardDetail.shippingAddress}
            shippingMethod={cardDetail.shippingMethod}
            tracking={cardDetail.tracking}
            comment={cardDetail.comment}
            regularTotal={cardDetail.regularTotal}
            formatTax={cardDetail.formatTax}
            orderNumber={cardDetail.orderNumber}
          />
        </CardText>
      </Card>
    );
  }
}
