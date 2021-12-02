import React, { useState, useReducer, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
  BsInfoLg,
  BsFillPersonFill,
  BsListTask,
  BsCashCoin,
  BsCurrencyDollar,
  BsCurrencyEuro,
} from 'react-icons/bs';
import ModalInfoButton from './ModalInfoButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../redux/user/userActions';
import { getQuotes } from '../redux/transactions/transactionsActions';
import { MdAlternateEmail, MdOutlinePerson, MdBrightness1 } from 'react-icons/md';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  size: '10',
  position: 'relative',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(-2),
    bottom: theme.spacing(-2),
  },
}));

export default function InfoButton() {
  useEffect(() => {
    dispatch(getAccounts(localStorage.getItem('userToken')));
    dispatch(getQuotes(localStorage.getItem('userToken')));
  }, []);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userAccounts = useSelector((state) => state.userReducer.userAccounts);
  const infoUser = useSelector((state) => state.authReducer.user);
  const quotes = useSelector((state) => state.transactionsReducer.quotes);
  console.log(quotes);

  const [modalState, dispatchModal] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'info':
          return {
            ...state,
            title: action.value,
            body: (
              <>
                <p>
                  <MdOutlinePerson size={25} color={'grey'} style={{ marginRight: '5%' }} />
                  {infoUser.name}
                </p>
                <p>
                  <MdAlternateEmail size={25} color={'grey'} style={{ marginRight: '5%' }} />
                  {infoUser.email}
                </p>
              </>
            ),
          };
        case 'accounts':
          return {
            ...state,
            title: action.value,
            body: (
              <>
                {userAccounts &&
                  userAccounts.map((account) => {
                    return (
                      <p key={account.id} value={account.id}>
                        <MdBrightness1 size={10} color={'grey'} style={{ marginRight: '5%' }} />
                        Cuenta {account.id} (Saldo {account.currency.name} {account.balance})
                      </p>
                    );
                  })}
              </>
            ),
          };
        case 'quotes':
          return {
            ...state,
            title: action.value,
            body: (
              <>
                <p>
                  <BsCurrencyDollar size={25} color={'grey'} style={{ marginRight: '5%' }} />
                  {quotes.usd}
                </p>
                <p>
                  <BsCurrencyEuro size={25} color={'grey'} style={{ marginRight: '5%' }} />
                  {quotes.eu}
                </p>
              </>
            ),
          };
        default:
          return state;
      }
    },
    {
      title: '',
      body: <h2>Hola aca info</h2>,
    },
  );

  const handleOpen = (action, v) => {
    setOpen(true);
    dispatchModal({ type: action, value: v });
  };
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <BsFillPersonFill onClick={() => handleOpen('info', 'Mi información')} size={20} />,
      name: 'Mi información',
    },
    {
      icon: <BsListTask onClick={() => handleOpen('accounts', 'Mis cuentas')} size={20} />,
      name: 'Mis cuentas',
    },
    {
      icon: <BsCashCoin onClick={() => handleOpen('quotes', 'Cotizaciones')} size={20} />,
      name: 'Cotizaciones',
    },
  ];

  return (
    <>
      <ModalInfoButton open={open} handleClose={handleClose} state={modalState}></ModalInfoButton>
      <Box sx={{ position: 'relative' }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={false}
          icon={<BsInfoLg size={20} />}
          direction={'right'}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </StyledSpeedDial>
      </Box>
    </>
  );
}
