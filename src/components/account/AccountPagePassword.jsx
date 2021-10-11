// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

export default function AccountPagePassword() {
    return (
        <div className="card">
            <Helmet>
                <title>{`Change Password — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>Change Password</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                {/* <div className="row no-gutters"> */}
                    <div className="row">
                        <div className="col-4 rowStyle">
                            <label htmlFor="password-current">Current Password</label>
                        </div>
                        <div className='col-6 '>
                            <input
                                type="password"
                                className="form-control"
                                id="password-current"
                                placeholder="Current Password"
                                style={{fontSize: '0.72vw'}}
                            />
                        </div>
                        <div className="col-4 rowStyle">
                            <label htmlFor="password-new">New Password</label>
                            </div>
                        <div className='col-6'>
                            <input
                                type="password"
                                className="form-control"
                                id="password-new"
                                placeholder="New Password"
                                style={{fontSize: '0.72vw'}}
                            />
                        </div>
                        <div className="col-4 rowStyle">
                            <label htmlFor="password-confirm">Reenter New Password</label>
                            </div>
                        <div className='col-6'>
                            <input
                                type="password"
                                className="form-control"
                                id="password-confirm"
                                placeholder="Reenter New Password"
                                style={{fontSize: '0.72vw'}}
                            />
                        </div>

                        <div className="mt-5 mb-0">
                            <button type="button" className="btn btn-primary">Change</button>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}
