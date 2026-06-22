'use client';

import React from 'react';

export default function LocationSection() {
  const partyMapUrl = "https://www.google.com/maps?q=2CX3+33R+Jewel+Sports+City+Resort+%26+Spa,+Zhraa+Nasr+City+-+Msaken+Al+Dobaet,+Al+Hay+Al+Asher,+Nasr+City,+Cairo+Governorate+4444161&ftid=0x14583d0bd8161ca9:0x524a3140233e28c3&entry=gps&shh=CAE";
  const partyEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6067756854124!2d31.3653153!3d30.0481284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d0bd8161ca9%3A0x524a3140233e28c3!2sJewel%20Sports%20City%20Resort%20%26%20Spa!5e0!3m2!1sen!2seg!4v1714856412345!5m2!1sen!2seg";
  const partyCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ebram+%26+Marina's+Wedding&dates=20260903T163000Z/20260903T233000Z&details=Celebrating+our+special+day!&location=Jewel+Sports+City+Resort+%26+Spa,+Nasr+City,+Cairo";

  const churchMapUrl = "https://www.google.com/maps?q=X3CR+X88+Blessed+Virgin+Mary+Church+and+St.+Anba+Reweiss+-+Ahram+Gardens,+Al+Haram,+Giza+Governorate+3510301&ftid=0x14584fef539ceaa1:0x9d960d607649e921&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,94282134,100813469,94286869,100813009&g_ep=CAISEjI2LjI0LjEuOTI4MjM2NTIyMBgAIIgnKlMsOTQyOTc2OTksOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsMTAwODEzNDY5LDk0Mjg2ODY5LDEwMDgxMzAwOUICRUc%3D&skid=89891b09-2958-47b7-ba0c-5fcf6364eb0e&g_st=ic";
  const churchEmbedUrl = "https://maps.google.com/maps?q=Blessed+Virgin+Mary+Church+and+St.+Anba+Reweiss,+Ahram+Gardens&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="location-section-container" style={{ gap: '2rem', flexWrap: 'wrap' }}>
      {/* Church Location Card */}
      <div className="location-card">
        <div className="location-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>

        <h2 className="location-title">Church Ceremony</h2>
        <p className="location-venue">We joyfully invite you to the Divine Liturgy at St. Ruwis and virgin Mary church, gate 4, pyramids gardens, Giza</p>

        <div className="location-time">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Starts from 6:00 PM</span>
        </div>

        <div className="map-container" style={{ marginTop: '2rem' }}>
          <iframe
            src={churchEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Church Location Map"
          ></iframe>
        </div>

        <div className="location-actions">
          <a href={churchMapUrl} target="_blank" rel="noopener noreferrer" className="location-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Open in Maps
          </a>
        </div>
      </div>

      {/* Reception Location Card */}
      <div className="location-card">
        <div className="location-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>

        <h2 className="location-title">Wedding Venue</h2>
        <p className="location-venue">Diamond Hall at Jewel Sports City Resort & Spa</p>

        <div className="location-time">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>From 8:30 PM to 12:00 AM</span>
        </div>

        <div className="map-container">
          <iframe
            src={partyEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Location Map"
          ></iframe>
        </div>

        <div className="location-actions">
          <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="location-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Open in Maps
          </a>
          <a href={partyCalendarUrl} target="_blank" rel="noopener noreferrer" className="location-btn outline">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Add to calendar
          </a>
        </div>
      </div>

    </div>
  );
}
