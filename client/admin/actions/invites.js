export function submitInviteForm(user, accountId, options) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch(options.resend ? '/invites/' + options.inviteId : '/invites', {
      method: options.resend ? 'put' : 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        sent_by_user_account_id: accountId,
        resend: options.resend
      })
    }).then((response) => {
      handleResponse(dispatch, response, 'SEND_INVITE_SUCCESS', 'SEND_INVITE_FAILURE');
    });
  };
}

export function resendInvite(inviteId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/invites/' + inviteId + '/resend')
      .then((response) => {
        handleResponse(dispatch, response, 'RESEND_INVITE_SUCCESS', 'RESEND_INVITE_FAILURE');
      });
  };
}

export function fetchInvites() {
  return (dispatch) => {
    return fetch('/invites')
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch(setInvites(Array.isArray(json.data) ? json.data : [json.data]));
          });
        }
      });
  };
}

export function cancelInvite(inviteId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/invites/' + inviteId, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CANCEL_INVITE_SUCCESS',
            messages: [json]
          });
        });
      }
    });
  };
}

function handleResponse(dispatch, response, successType, failureType) {
  if (response.ok) {
    return response.json().then((json) => {
      dispatch({
        type: successType,
        messages: [json]
      });
    });
  } else {
    return response.json().then((json) => {
      dispatch({
        type: failureType,
        messages: Array.isArray(json) ? json : [json]
      });
    });
  }
}

function setInvites(invites) {
  return { type: 'SET_INVITES', invites: invites };
}
