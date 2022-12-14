import { Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { BiExport, BiPencil } from 'react-icons/bi';
import { ImEye } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { formatDateAndTime } from '../../../../helpers/formatDate';
import {
  fetchPayments,
  selectPaymentHasAccount,
  selectPaymentNoAccount,
  selectPaymentsIsLoading,
} from '../../../../store/slices/paymentsSlice';

export default function ClinicPayments() {
  const dispatch = useDispatch();
  const [modeHaveAccount, setModeHaveAcocunt] = useState(true);
  const { clinic_id } = useParams();
  const isLoading = useSelector(selectPaymentsIsLoading);
  const paymentsHasAccount = useSelector(selectPaymentHasAccount);
  const paymentsNoAccount = useSelector(selectPaymentNoAccount);

  useEffect(() => {
    dispatch(fetchPayments(clinic_id));
  }, [clinic_id, dispatch]);

  const columnsHasAccount = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'payment_id',
    },
    {
      title: 'Patient ID',
      key: 'patient id',
      render: (record) => (
        <Link to={`/patients/detail/${record.patient_id}`}>
          {record.patient_id}
        </Link>
      ),
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Paid on',
      key: 'Paid on',
      dataIndex: 'paid_on',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/clinics/detail/${clinic_id}/payments/detail/${record.payment_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`update/${record.payment_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {}}
            // to={`update/${record.appointment_id}`}
          >
            <BiExport />
            <span>Export</span>
          </Link>
        </div>
      ),
    },
  ];

  const columnsNoAccount = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'payment_id',
    },
    {
      title: 'Patient Name',
      key: 'full name',
      dataIndex: 'full_name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Paid on',
      key: 'Paid on',
      dataIndex: 'paid_on',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/clinics/detail/${clinic_id}/payments/detail/${record.payment_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`update/${record.payment_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            // to={`update/${record.appointment_id}`}
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {}}
          >
            <BiExport />
            <span>Export</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="payment-content-detail">
      <div className="header">
        <div className="title-container">
          <h4 className="title">Payments Information</h4>
        </div>
        <Link to="create" className="button button--main" type="button">
          <span>Add payment</span>
        </Link>
      </div>
      <div className="switch-table">
        <span className="text-mode">
          {modeHaveAccount
            ? 'Payment has patient accounts'
            : 'Payment does not have patient accounts'}
          :{' '}
        </span>
        <Switch
          onChange={(values) => setModeHaveAcocunt(values)}
          defaultChecked={modeHaveAccount}
          className="switch"
        />
      </div>
      <Table
        rowClassName="custom-row"
        x={true}
        loading={isLoading}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        columns={modeHaveAccount ? columnsHasAccount : columnsNoAccount}
        dataSource={modeHaveAccount ? paymentsHasAccount : paymentsNoAccount}
        rowKey={(record) => record.payment_id}
      ></Table>
    </div>
  );
}
