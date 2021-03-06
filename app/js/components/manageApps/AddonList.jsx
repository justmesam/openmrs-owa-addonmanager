/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export const AddonList = ({
  handleDownload,
  addonList,
  openPage,
  openModal,
  updatesAvailable,
  searchedAddons,
  getInstalled,
}) => {
  let installedSearchResults;
  const appList =  searchedAddons.length > 0 ? searchedAddons : addonList;
  searchedAddons.length > 0 ? installedSearchResults = getInstalled(addonList, searchedAddons) : null;

  return (
    <tbody>
      {
        appList.map((app, key) => {
          let found = null;
          searchedAddons.length > 0 && installedSearchResults.includes(app.appDetails.name) ?
            found = addonList.find(addon => addon.appDetails.name === app.appDetails.name) : null;
          if (found) {
            app = found;
          }
          let addonParam = app.appDetails.uuid ?
            'module-' + app.appDetails.uuid : 'owa-' + app.appDetails.name;
          return (
            <tr key={key}>
              <td onClick={() => openPage(app.appDetails)}>
                <img
                  src={app.appDetails &&
                    app.appDetails.icon !== null &&
                    app.appDetails.icons !== undefined ?
                    `/${location.href.split('/')[3]}/owa/openmrs-addonmanager/${app.appDetails.icons[48]}` :
                    `./img/omrs-button.png`}
                  alt="addon logo"
                />
              </td>
              <td onClick={() => openPage(app.appDetails)}>
                <div className="addon-name">
                  {
                    app.appDetails.started === true || app.appDetails.started === undefined ?
                      <div className="status-icon" id="started-status" />
                      :
                      <div className="status-icon" id="stopped-status" />
                  }
                  {app.appDetails && app.appDetails.name}
                </div>
                <div><h5 className="addon-description">
                  {app.appDetails && app.appDetails.description}
                </h5></div>
                {updatesAvailable && updatesAvailable.hasOwnProperty(app.appDetails.name) ? <span className="update-notification">New version Available </span>: null}
                {updatesAvailable && updatesAvailable.hasOwnProperty(app.appDetails.name) ? updatesAvailable[app.appDetails.name]: null}

              </td>
              <td onClick={() => openPage(app.appDetails)}>
                {
                  app.appDetails && app.appDetails.uuid ?
                    app.appDetails.author :
                    app.appDetails && app.appDetails.developer ?
                      app.appDetails.developer.name :
                      app.appDetails.maintainers[0].name
                }
              </td>
              <td onClick={() => openPage(app.appDetails)}>
                {app.appDetails.version ?
                  app.appDetails.version :
                  app.appDetails.latestVersion}
              </td>
              <td
                className="text-center"
                id="view-icon-wrapper"
              >
                {
                  app.install === false ?
                    <Link
                      to={{
                        pathname: "addon/" + addonParam,
                      }}
                    >
                      <button id="view-addon-btn" className="btn btn-secondary">
                        <i className="glyphicon glyphicon-option-vertical view-icon" />
                        View
                      </button>
                    </Link>
                    :
                    <i
                      className="glyphicon glyphicon-download-alt text-primary install-icon"
                      id="icon-btn"
                      onClick={(e) => handleDownload(app.downloadUri)(e)}
                    />
                }
              </td>
            </tr>
          );
        })
      }
    </tbody>
  );
};

AddonList.propTypes = {
  addonList: PropTypes.array.isRequired,
  openPage: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  searchedAddons: PropTypes.array.isRequired,
  getInstalled: PropTypes.func.isRequired,
};
