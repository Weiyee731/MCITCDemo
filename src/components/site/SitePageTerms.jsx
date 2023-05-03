// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
import { Typography } from "@mui/material";

function SitePageTerms() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Terms And Conditions", url: "/site/terms" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Terms And Conditions — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Terms And Conditions</h1>
              <div className="document__subtitle">
                This Agreement was last modified on 23 Dec 2022.
              </div>
            </div>
            <div className="document__content typography" align="justify">
              <h3> INTRODUCTION </h3>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.1 Welcome to the mcitc.my website and/or the MCITC mobile
                app (the “Platform”). These Terms of Use govern your access and
                use of the Platform and the use of any services, information and
                functions made available by us at the Platform (“Services”).
                Before using this Platform or the Services, you must read
                carefully and accept these Terms of Use and all other terms and
                conditions and policies pertaining to the use of the Platform
                and/or the Services (collectively referred to as MCITC Terms
                and Conditions”) and you must consent to the processing of your
                personal data as described in the Privacy Policy set out at
                https://mcitc.my/site/policy. By accessing the
                Platform and/or using the Services, you agree to be bound by
                MCITC Terms and Conditions and any amendments to the foregoing
                issued by us from time to time. If you do not agree to MCITC
                Terms and Conditions and the Privacy Policy, do not access
                and/or use this Platform and/or the Services.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.2 MCITC reserves the right, to change, modify, add, or remove
                portions of these Terms of Use and/or MCITC Terms and Conditions
                at any time. Changes will be effective when posted on the
                Platform with no other notices provided and you are deemed to be
                aware of and bound by any changes to the foregoing upon their
                publication on the Platform.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.3 If you are under the age of 18 or the legal age for giving
                consent hereunder pursuant to the applicable laws in your
                country (the “legal age”), you must obtain permission from your
                parent(s) or legal guardian(s) to open an account on the
                Platform. If you are the parent or legal guardian of a minor who
                is creating an account, you must accept and comply with these
                Terms of Use on the minor's behalf and you will be responsible
                for the minor’s actions, any charges associated with the minor’s
                use of the Platform and/or Services or purchases made on the
                Platform. If you do not have consent from your parent(s) or
                legal guardian(s), you must stop using/accessing this Platform
                and/or Services.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>2. USE OF THE PLATFORM AND/OR SERVICES</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.1 We grant you a non-transferable and revocable license to use
                the Platform and/or Services, subject to these Terms of Use, for
                the purpose of shopping for personal items sold on the Platform.
                Commercial use or use on behalf of any third party is
                prohibited, except as explicitly permitted by us in advance. Any
                breach of these Terms of Use shall result in the immediate
                revocation of the license granted herein without notice to you.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.2 Content provided on this Platform is solely for
                informational purposes. Product representations expressed on
                this Platform are those of the vendor and are not made by us.
                Submissions or opinions expressed on this Platform are those of
                the individual posting such content and may not reflect our
                opinions.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.3 Certain services and related features that may be made
                available on the Platform may require registration or
                subscription. Should you choose to register or subscribe for any
                such services or related features, you agree to provide accurate
                and current information about yourself, and to promptly update
                such information if there are any changes. Every user of the
                Platform is solely responsible for keeping passwords and other
                account identifiers safe and secure. The account owner is
                entirely responsible for all activities that occur under such
                password or account. Furthermore, you must notify us of any
                unauthorized use of your password or account. MCITC shall not be
                responsible or liable, directly or indirectly, in any way for
                any loss or damage of any kind incurred as a result of, or in
                connection with, your failure to comply with this section.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.4 We may, from time to time and without giving any reason or
                prior notice, upgrade, modify, suspend or discontinue the
                provision of or remove, whether in whole or in part, the
                Platform or any Services and shall not be liable if any such
                upgrade, modification, suspension or removal prevents you from
                accessing the Platform or any part of the Services.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>2.5 We reserve the right, but shall not be obliged to:</Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                (a) monitor, screen or otherwise control any activity, content or
                material on the Platform and/or through the Services. We may in
                our sole and absolute discretion, investigate any violation of
                these Terms of Use contained herein and may take any action it
                deems appropriate;
                <br />
                (b) prevent or restrict access of any an authorised user to the
                Platform and/or the Services;
                <br />
                (c) report any activity it suspects to be in violation of any
                applicable law, statute or regulation to the appropriate
                authorities and to co-operate with such authorities; and/or
                <br />
                (d) to request any information and data from you in connection
                with your use of the Services and/or access of the Platform at any
                time and to exercise our right under this paragraph if you refuse
                to divulge such information and/or data or if you provide or if we
                have reasonable grounds to suspect that you have provided
                inaccurate, misleading or fraudulent information and/or data.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.6 Third Party Vendors: You acknowledge that parties other than
                MCITC (i.e. Third Party Vendors) list and sell Products on the
                Platform. Whether a particular Product is listed for sale on the
                Platform by MCITC or a Third Party Vendor may be stated on the
                webpage listing that Product. For the avoidance of doubt, each
                agreement entered into for the sale of a Third Party Vendor’s
                Products to a Customer shall be an agreement entered into
                directly and only between the Third Party Vendor and the
                Customer. You further acknowledge that Third Party Vendors may
                utilize paid services offered by MCITC to occupy certain product
                listings slots within your search results on the Platform. Such
                Product listing may be accompanied by a "megaphone" logo.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>3. USER SUBMISSIONS</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                3.1 You grant us a non-exclusive license to use the materials or
                information that you submit to the Platform and/or provide to
                us, including but not limited to, questions, reviews, comments,
                and suggestions (collectively, "Submissions"). When you post
                comments or reviews to the Platform, you also grant us the right
                to use the name that you submit or your username, in connection
                with such review, comment, or other content. You shall not use a
                false e-mail address, pretend to be someone other than yourself
                or otherwise mislead us or third parties as to the origin of any
                Submissions. We may, but shall not be obligated to, remove or
                edit any Submissions.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>4. TRADEMARKS AND COPYRIGHTS</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                4.1 All intellectual property rights, whether registered or
                unregistered, in the Platform, information content on the
                Platform and all the website design, including, but not limited
                to, text, graphics, software, photos, video, music, sound, and
                their selection and arrangement, and all software compilations,
                underlying source code and software (collectively referred to as
                “Intellectual Property”) shall remain our property or where
                applicable, our affiliates or third party intellectual property
                owners. The entire contents of the Platform also are protected
                by copyright as a collective work under Malaysia copyright laws
                and international conventions. All rights are reserved.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                4.2 No part or parts of the Platform may be reproduced, reverse
                engineered, decompiled, disassembled, separated, altered,
                distributed, republished, displayed, broadcasted, hyperlinked,
                mirrored, framed, transferred or transmitted in any manner or by
                any means or stored in an information retrieval system or
                installed on any servers, system or equipment any Intellectual
                Property without our prior written permission or that of the
                relevant Intellectual Property owners. No party accessing the
                Platform shall claim any right, title or interest therein.
                Permission will only be granted to you to download, print or use
                the Intellectual Property for personal and non-commercial uses,
                provided that you do not modify the Intellectual Property and
                that we or the relevant copyright owners retain all copyright
                and other proprietary notices contained in the Materials.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>5. Our limitation of responsibility and liability</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.1 The Platform and all data and/or information contained
                therein and/or the Services are provided on an “as is” and “as
                available” basis without any warranties, claims or
                representations made by MCITC of any kind either expressed,
                implied or statutory with respect to the Platform and/or the
                Services, including, without limitation, warranties of
                non-infringement of third party rights, title, merchantability,
                satisfactory quality or fitness for a particular purpose. All
                data and/or information contained in the Platform and/or the
                Services are provided for informational purposes only.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.2 Without limiting the foregoing, MCITC does not warrant that
                the Platform and/or the Services or the functions contained
                therein will be available, accessible, uninterrupted, timely,
                secure, accurate, complete or error-free, that defects, if any,
                will be corrected, or that this Platform and/or the server that
                makes the same available are free of viruses, clocks, timers,
                counters, worms, software locks, drop dead devices,
                trojan-horses, routings, trap doors, time bombs or any other
                harmful codes, instructions, programs or components.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.3 MCITC and all of its respective officers, employees,
                directors, agents, contractors and assigns shall not be liable to
                you for any losses whatsoever or howsoever caused (regardless of
                the form of action) arising directly or indirectly in connection
                with:
              </Typography>
              {/* <br /> */}
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                (a) any access, use and/or inability to use the Platform or the
                Services;
                <br />
                (b) reliance on any data or information made available through the
                Platform and/or through the Services. You should not act on such
                data or information without first independently verifying its
                contents;
                <br />
                (c) any system, server or connection failure, error, omission,
                interruption, delay in transmission, computer virus or other
                malicious, destructive or corrupting code, agent program or
                macros; and
                <br />
                (d) any use of or access to any other website or webpage linked to
                the Platform, even if we or our officers or agents or employees
                may have been advised of, or otherwise might have anticipated, the
                possibility of the same.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.4 Any risk of misunderstanding, error, damage, expense or
                losses resulting from the use of the Platform and/or Services is
                entirely at your own risk and we shall not be liable therefore.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>6. HYPERLINKS</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.1 For your convenience, we may include hyperlinks to other
                websites or content on the Platform that are owned or operated
                by third parties. Such linked websites or content are not under
                our control and we are not liable for any errors, omissions,
                delays, defamation, libel, slander, falsehood, obscenity,
                pornography, profanity, inaccuracy or any other objectionable
                material contained in the contents, or the consequences of
                accessing, any linked website. Any hyperlinks to any other
                websites or content are not an endorsement or verification of
                such websites or content and you agree that your access to or
                use of such linked websites or content is entirely at your own
                risk.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>7. APPLICABLE LAW AND JURISDICTION</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.1 These Terms of Use and/or other MCITC Terms and Conditions
                shall be interpreted and governed by the laws in force in
                Malaysia. Subject to the section on Arbitration below, you
                hereby agree to submit to the jurisdiction of the Courts of
                Malaysia.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>8. ARBITRATION</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.1 Any controversy, claim or dispute arising out of or relating
                to these Terms of Use and/or other MCITC Terms and Conditions or
                the breach, termination or invalidity thereof shall be referred
                to and settled by arbitration in accordance with the Arbitration
                Rules of the Asian International Arbitration Centre (“AIAC”)
                held in Kuala Lumpur, Malaysia. The arbitral tribunal shall
                consist of a sole arbitrator who is legally trained and who has
                experience in the information technology field in Malaysia and
                is independent of either party. The place of arbitration shall
                be Malaysia. Any award by the arbitration tribunal shall be
                final and binding upon the parties.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.2 Notwithstanding the foregoing, MCITC reserves the right to
                pursue the protection of intellectual property rights and
                confidential information through injunctive or other equitable
                relief through the courts.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>9. TERMINATION</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                9.1 In addition to any other legal or equitable remedies, we
                may, without prior notice to you, immediately terminate or
                revoke any or all of your rights granted under these Terms of
                Use and/or other MCITC Terms and Conditions. Upon any
                termination of these Terms of Use and/or other MCITC Terms and
                Conditions, you shall immediately cease all access to and use of
                the Platform and/or Services and we shall, in addition to any
                other legal or equitable remedies, immediately revoke all
                password(s) and account identification issued to you and deny
                your access to and use of this Platform and/or Services in whole
                or in part. Any termination of this agreement shall not affect
                the respective rights and obligations (including without
                limitation, payment obligations) of the parties arising before
                the date of termination. You furthermore agree that MCITC shall
                not be liable to you or to any other person as a result of any
                such suspension or termination. If you are dissatisfied with the
                Platform and/or Services or with any terms, conditions, rules,
                policies, guidelines, or practices of MCITC, in operating the
                Platform and/or providing Services, your sole and exclusive
                remedy is to discontinue using the Platform and/or the Services.
              </Typography>
              <Typography variant="h6" style={{ lineHeight: 2, fontWeight: 600 }}> TERMS AND CONDITIONS OF SALE </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>1. Interpretation</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, marginTop: 0 }}>1.1 In these Conditions:</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, marginTop: 0 }}>
                "Buyer" means the person who purchases Goods on the Platform;
                <br />
                "Conditions" mean these Terms and Conditions of Sale;
                <br />
                "Contract" means the contract formed when Seller accepted the
                order placed by Buyer on the Platform for the purchase of Goods
                sold by Seller;
                <br />
                "Goods" means the goods made available for sale on the Platform,
                including any instalment of the goods or any parts for them;
                <br />
                “MCITC Terms and Conditions” means these Terms and Conditions of
                Sale and all other terms and conditions and policies pertaining to
                the use of the Platform and/or the Services;
                <br />
                “Platform” means the mcitc.my website and/or the MCITC mobile
                app;
                <br />
                “Seller” means a seller which uses the Platform and/or Services to
                sell Goods to the Buyers, and includes a Third Party Vendor. MCITC
                may also be a “Seller” for selected Goods;
                <br />
                “Services” means the use of any services, information and
                functions made available by MCITC at the Platform;
                <br />
                “Third Party Vendor” means a seller which uses the Platform and/or
                Services to sell Goods to the Buyers, and excludes MCITC; and
                <br />
                "Writing" includes electronic mail facsimile transmission and any
                comparable means of communication.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.2 Any reference in these Conditions to any provision of a
                statute shall be construed as a reference to that provision as
                amended, re-enacted or extended at the relevant time.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.3 Any references to “MCITC” in these Conditions refer to both
                MCITC’s actions on its own behalf as Seller and/or as the
                operator of the Platform and/or as the agent of Third Party
                Vendors as Sellers in respect of each and every Contract.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                1.4 The headings in these Conditions are for convenience only
                and shall not affect the interpretation of any parties.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>2. Basis of the Contract</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.1 The Platform provides a place and opportunity for the sale
                of Goods between the Buyer and the Seller (collectively
                “Parties”). The identity of the Seller for a particular Goods
                listed for sale on the Platform, be it MCITC or a Third Party
                Vendor, may be stated on the webpage listing such Goods.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.2 Where the Buyer has placed an order on the Platform for the
                purchase of Goods sold by MCITC and MCITC has accepted the same,
                this shall constitute a Contract entered into directly between
                the Buyer and MCITC. On the other hand, where the Buyer has
                placed an order on the Platform for the purchase of Goods sold
                by a Third Party Vendor and the said Third Party Vendor has
                accepted the same, this shall constitute a Contract entered into
                directly between the Buyer and the Third Party Vendor. Where the
                Contract is entered into directly between the Buyer and a Third
                Party Vendor, MCITC is not a party to the Contract or any other
                Contract between the Buyer and Third Party Vendor and accepts no
                obligations in connection with any such Contract. Parties to
                such contracts shall be entirely responsible for the Contract
                between them, the listing of Goods, warranty of purchase and the
                like.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.3 Any information made available on the Platform in connection
                with the supply of Goods, including photographs, drawings, data
                about the extent of the delivery, appearance, performance,
                dimensions, weight, consumption of operating materials,
                operating costs or any information disclosed by Third Party
                Vendors through the chat system are not binding and for
                information purposes only. In entering into the Contract, the
                Buyer acknowledges that it does not rely on and waives any claim
                based on any such representations or information so provided.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.4 While the Seller endeavours to provide an accurate
                description of the Goods, neither MCITC nor Seller warrants that
                such description is accurate, current or free from error. In the
                event that the Goods the Buyer receives is fundamentally
                different from the Goods as described on the Platform and which
                the Buyer has ordered, Clause 7 of these Conditions shall apply.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                2.5 Any typographical clerical or other error or omission in any
                quotation, invoice or other document or information issued by
                MCITC in its website shall be subject to correction without any
                liability on the part of MCITC.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>3. Orders and Specifications</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                3.1 The Buyer may purchase Goods by placing and completing the
                order form on the Platform and shall be responsible for ensuring
                the accuracy of the order. All orders shall be subject to
                Seller’s acceptance in their sole discretion and each order
                accepted by the Seller shall constitute a separate Contract and
                shall be deemed to be irrevocable and unconditional upon
                transmission through the Platform. MCITC shall be entitled (but
                not obliged) to process such orders without further consent from
                the Buyer. Nevertheless, you may request to cancel or amend the
                order which MCITC shall endeavour (but not obliged) to give
                effect to on a commercially reasonable effort basis.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                3.2 Order acceptance and completion of the Contract between the
                Buyer and Seller will only be completed upon MCITC issuing a
                confirmation of dispatch of the Goods to the Buyer. For the
                avoidance of doubt, MCITC shall be entitled to refuse or cancel
                any order without giving any reasons for the same to the Buyer
                prior to issue of the confirmation of dispatch. MCITC shall
                furthermore be entitled to require the Buyer to furnish MCITC
                with contact and other verification information, including but
                not limited to address, contact numbers prior to issuing a
                confirmation of dispatch.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                3.3 No concluded Contract may be modified or cancelled by the
                Buyer except with prior written consent from MCITC and on terms
                that the Buyer shall indemnify MCITC in full against all loss
                (including loss of profit), costs (including the cost of all
                labour and materials used), damages, charges and expenses
                incurred by MCITC as a result of the modification or
                cancellation, as the case may be.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>4. Price</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                4.1 The price of the Goods shall be the price stated on the
                Platform at the time which the Buyer places and completes the
                order form on the Platform. The price includes any applicable
                sales and services tax, value added tax or similar tax which the
                Buyer shall be liable to pay to MCITC in addition to the price,
                but it excludes the delivery charges.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                4.2 In the event that a Goods has been mispriced on the
                Platform, the Seller reserves the right to terminate the
                Contract, in which MCITC shall, on behalf of Seller (where
                Seller is a Third Party Vendor), notify the Buyer of such
                cancellation by giving three days’ notice. The Seller shall have
                such right to terminate the Contract notwithstanding that the
                Goods have been dispatched or are in transit or that payment has
                been charged to Buyer.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>5. Terms of Payment</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.1 The Buyer shall be entitled to make payment for the Goods
                using the various payment methods made available on the
                Platform. When Buyer places an order on the Platform, actual
                payment shall be only charged upon Seller’s acceptance of
                Buyer’s order and the formation of a Contract. All payments
                shall be made to MCITC, either accepting payment in its own
                right or as Seller’s agent (where Seller is a Third Party
                Vendor). Buyer acknowledge that MCITC is entitled to collect
                payments from Buyer on behalf of Third Party Vendors.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                5.2 The terms and conditions applicable to each type of payment,
                as prescribed by MCITC on the Platform, shall be applicable to
                the Contract. The payment methods may also be subject to the
                following terms:
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: 0 }}>5.2.1 Credit Card</Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                Credit card payment option is available for all Buyers. MCITC
                accepts all Visa and MasterCards credit cards and is 3D Secure
                enabled (verified by Visa and secured by MasterCard). All credit
                card information of Buyers are protected by industry leading
                encryption standards.
                <br />
                Please take note that additional charges may be incurred if Buyer
                is using a non-Malaysian issued card due to foreign exchange
                rates.
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: 0 }}>5.2.2 Debit Cards</Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                MCITC accepts all Malaysian Visa and MasterCard debit cards,
                subject to bank availability. All debit card numbers shall be
                protected by industry leading encryption standards.
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: 0 }}>5.2.3 Online Banking</Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                By choosing this payment method, the Buyer shall transfer the
                amount of the total purchase price for the Goods purchased by
                Buyer to a MCITC account (including any applicable taxes, fees and
                shipping costs). The transaction must be payable in Ringgit
                Malaysia. MCITC, in its sole discretion, may refuse this payment
                option service to anyone or any user without notice for any reason
                at any time.
              </Typography>
              {/* 5.2.4 Cash on Delivery
              <br />
              Buyer may not claim against Seller or any of its agents (which may
              include MCITC), for any failure, disruption or error in connection
              with the Buyer’s chosen payment method. MCITC reserves the right
              at any time to modify or discontinue, temporarily or permanently,
              any payment method without notice to the Buyer or giving any
              reason. If the Buyer fails to make any payment pursuant to the
              terms and conditions of the payment method elected or payment is
              cancelled for any reason whatsoever, then without prejudice to any
              other right or remedy available to Seller, Seller shall be
              entitled to:
              <br />
              <br />
              <p>
                5.2.4.1 cancel the Contract or suspend deliveries of the Goods
                until payment is made in full; and/or
              </p>
              <p>
                5.2.4.2 charge the Buyer interest on the amount unpaid at the
                rate of one per cent (1.0%) per month until payment in full is
                made (a part of a month being treated as a full month for the
                purposes of calculating interest).
              </p> */}
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>6. Delivery of Goods</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.1 Delivery of the Goods shall be made to the address specified
                by the Buyer in its order.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.2 MCITC has the right at any time to sub-contract all or any
                of its obligations for the sale/delivery of the Goods to any
                other party as it may from time to time decide without giving
                notice of the same to the Buyer.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.3 Any dates quoted for delivery of the Goods are approximate
                only and delays may occur. The time for delivery/performance
                shall not be of the essence, and MCITC shall not be liable for
                any delay in delivery or performance howsoever caused.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.4 If Seller has failed to deliver the Goods in accordance with
                the Contract or within a reasonable time, the Buyer shall, by
                serving a written notice to MCITC, be entitled to demand
                performance within a specified time thereafter and such
                specified time shall be no less than 14 days. If MCITC fails to
                do so within the specified time, the Buyer shall be entitled to
                terminate the Contract and claim a refund in respect of the
                undelivered Goods.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                6.5 If the Buyer fails to take delivery of the Goods (otherwise
                than by reason of any cause beyond the Buyer's reasonable
                control or by reason of Seller's fault) then without prejudice
                to any other right or remedy available to MCITC, MCITC may:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                6.5.1 sell the Goods at the best price readily obtainable and
                (after deducting all reasonable storage and selling expenses)
                account to the Buyer for the excess over the price under the
                Contract provided the price has been paid in cleared funds in
                full or charge the Buyer for any shortfall below the price under
                the Contract; or
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2 }}>6.5.2 terminate the Contract and claim damages.</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }} >7. Return, Refund and Replacement of Goods</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.1 All Goods sold on the Platform is covered under the MCITC 7
                Days Easy Returns or 14 Days Easy Returns depending on the Goods
                sold (“Return Policy”). Buyer may initiate the returns process
                by communicating with MCITC or Seller through the Platform. The
                logo(s) of the Return Policy for each Goods can be found on the
                Goods’ product page.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.2 Buyer may, by completing the Online Return Form, apply to
                return the purchased Goods to MCITC or Seller in exchange for a
                replacement or a refund. Buyer shall ensure that the purchased
                Goods is returned to MCITC or Seller within 7 or 14 calendar
                days from the delivery date, depending on the applicable Return
                Policy. For avoidance of doubt, the countdown starts from the
                date the Buyer received the purchased Goods to the post stamp
                date on the return parcel. In case of damaged Goods, please
                contact MCITC or Seller within 48 hours of receiving the
                delivery to expedite the claim process.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.3 Buyer may only apply for return of the purchased Goods in
                the following circumstances:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                7.3.1 the Goods delivered to Buyer is defective and/or damaged
                on delivery;
                <br />
                7.3.2 the Goods, in particular fashion items, which does not fit
                (not applicable for fashion items from overseas Sellers);
                <br />
                7.3.3 the Goods delivered to Buyer is materially different from
                the description provided by Seller in the listing of the Goods;
                <br />
                7.3.4 the Goods delivered to Buyer does not match the agreed
                specification (e.g. wrong size, colour, etc.) stipulated in the
                order;
                <br />
                7.3.5 Buyer has a change of mind with regard to the Goods; and
                <br />
                7.3.6 such other circumstances which may be prescribed by MCITC
                on the Platform.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.4 Notwithstanding Clause 7.3 above, milk formula products are
                returnable except for "change of mind" request. Buyer is to
                ensure that product is not opened, as otherwise it will not be
                accepted for return.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.5 Notwithstanding Clause 7.3 above, return or cancellations of
                any perishable goods are not allowed. To ensure that Buyer is
                satisfied with the product Buyer received, Buyer should inspect
                the contents as soon as the order arrives.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                7.6 The application for return of Purchased Goods may also be
                subject to additional terms and conditions prescribed by MCITC
                on the Platform. Please see Help Center for further details.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, }}>7.7 Questions and complaints with regards to returns</Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                7.7.1 If you have any questions or complaints, (i) you may
                either contact the Seller directly via the Platform or (ii)
                contact MCITC using the “Contact Us” page on the Platform, as
                applicable.
                <br />
                7.7.2 In the event that Buyer is unable to resolve any dispute
                with Seller directly through amicable negotiations, MCITC
                reserves the right to suggest and implement an appropriate
                resolution at its sole discretion.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>8 Risk and property of the Goods</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.1 Where the Goods have been delivered to the Buyer even after
                such refunds have been claimed by the Buyer pursuant to Clause
                6.4 above, Buyer shall immediately notify MCITC of the delivery.
                The property in the Goods shall not pass to the Buyer and Buyer
                shall hold the Goods as MCITC's fiduciary agent and bailee and
                shall keep the Goods separate from those of the Buyer. MCITC
                shall be entitled at any time to demand the Buyer to deliver up
                the Goods to MCITC and in the event of non-compliance MCITC
                reserves its right to take legal action against the Buyer for
                the delivery of the Goods and also reserves its right to seek
                damages and all other costs including but not limited to legal
                fees against the Buyer.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.2 Risk of damage to or loss of the Goods shall pass to the
                Buyer at the time of delivery or if the Buyer wrongfully fails
                to take delivery of the Goods, the time when MCITC has tendered
                delivery of the Goods.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.3 Notwithstanding delivery and the passing of risk in the
                Goods or any other provision of these Conditions, the property
                in the Goods shall not pass to the Buyer until MCITC has
                received in cash or cleared funds payment in full of the price
                of the Goods and all other goods agreed to be sold by Seller to
                the Buyer for which payment is then due.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.4 Until such time as the property in the Goods passes to the
                Buyer, the Buyer shall hold the Goods as MCITC's fiduciary agent
                and bailee and shall keep the Goods separate from those of the
                Buyer.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.5 The Buyer agrees with MCITC that the Buyer shall immediately
                notify MCITC of any matter from time to time affecting MCITC’s
                title to the Goods and the Buyer shall provide MCITC with any
                information relating to the Goods as MCITC may require from time
                to time.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.6 Until such time as the property in the Goods passes to the
                Buyer (and provided the Goods are still in existence and have
                not been resold), MCITC shall be entitled at any time to demand
                the Buyer to deliver up the Goods to MCITC and in the event of
                non-compliance MCITC reserves its right to take legal action
                against the Buyer for the delivery of the Goods and also
                reserves its right to seek damages and all other costs including
                but not limited to legal fees against the Buyer.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.7 The Buyer shall not be entitled to pledge or in any way
                charge by way of security for any indebtedness any of the Goods
                which remain the property of MCITC but if the Buyer does so all
                moneys owing by the Buyer to MCITC shall (without prejudice to
                any other right or remedy of MCITC) forthwith become due and
                payable.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.8 If the provisions in this Clause 8 of these Conditions are
                not effective according to the law of the country in which the
                Goods are located, the legal concept closest in nature to
                retention of title in that country shall be deemed to apply
                mutatis mutandis to give effect to the underlying intent
                expressed in this condition, and the Buyer shall take all steps
                necessary to give effect to the same.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                8.9 The Buyer shall indemnify MCITC against all loss damages
                costs expenses and legal fees incurred by the Buyer in
                connection with the assertion and enforcement of MCITC's rights
                under this condition.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }} >9 Termination</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                9.1 Buyer may terminate the Contract before Seller dispatches
                the Goods, by written notice to MCITC through our Contact Us
                page at https://mcitc.my/site/contact-us. If the Goods have
                already been dispatched, Buyer may not terminate the Contract
                but may only return the Goods in accordance with Clause 7 of
                these Conditions.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                9.2 Without prejudice to any other right of termination
                elsewhere in these Conditions, Seller, or MCITC acting on
                Seller’s behalf, may stop any Goods in transit, suspend further
                deliveries to the Buyer and/or terminate the Contract with
                immediate effect by written notice to the Buyer on or at any
                time after the occurrence of any of the following events:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                9.2.1 the Goods under the Contract being unavailable for any
                reason; and/or
                <br />
                9.2.2 the Goods under the Contract has been mispriced on the
                Platform.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>10 Warranties and Remedies</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.1 Subject as expressly provided in these Conditions, all
                other warranties conditions or terms, including those implied by
                statute or common law, are excluded to the fullest extent
                permitted by law.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.2 Subject to this Clause 10 of these Conditions, MCITC
                warrants that the Goods will correspond with their specification
                at the time of delivery, and agrees to remedy any non-conformity
                therein for a period of 12 months commencing from the date on
                which the Goods are delivered or deemed to be delivered
                ("Warranty Period"). Where the Buyer is dealing as a consumer
                (within the meaning of the Sale of Goods Act and the Consumer
                Protection Act), MCITC further gives to the Buyer such implied
                warranties as cannot be excluded by law.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.3 MCITC’s above warranty concerning the Goods is given
                subject to the following conditions:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                10.3.1 No condition is made or to be implied nor is any warranty
                given or to be implied as to the life or wear of the Goods
                supplied or that they will be suitable for any particular
                purpose or use under any specific conditions, notwithstanding
                that such purpose or conditions may be known or made known to
                MCITC.
                <br />
                10.3.2 Any description given of the Goods is given by way of
                identification only and the use of such description shall not
                constitute a sale by description.
                <br />
                10.3.3 MCITC binds itself only to deliver Goods in accordance
                with the general description under which they were sold, whether
                or not any special or particular description shall have been
                given or shall be implied by law. Any such special or particular
                description shall be taken only as the expression of MCITC's
                opinion in that behalf. MCITC is not liable for any such special
                or particular description which may have been provided by Third
                Party Vendors through the chat system. MCITC does not give any
                warranty as to the quality state condition or fitness of the
                Goods.
                <br />
                10.3.4 MCITC shall be under no liability for the following
                measures and actions taken by the Buyer or third parties and the
                consequences thereof: improper remedy of defects, alteration of
                the Goods without the prior agreement of MCITC, addition and
                insertion of parts, in particular of spare parts which do not
                come from MCITC.
                <br />
                10.3.5 MCITC shall be under no liability in respect of any
                defect arising from unsuitable or improper use, defective
                installation or commissioning by the Buyer or third parties,
                fair wear and tear, wilful damage, negligence, abnormal working
                conditions, defective or negligent handling, improper
                maintenance, excessive load, unsuitable operating materials and
                replacement materials, poor work, unsuitable foundation,
                chemical, electro-technical/electronic or electric influences,
                failure to follow MCITC's instructions (whether oral or in
                writing) misuse or alteration or repair of the Goods without
                MCITC's approval.
                <br />
                10.3.6 MCITC is not liable for any loss damage or liability of
                any kind suffered by any third party directly or indirectly
                caused by repairs or remedial work carried out without MCITC’s
                prior written approval and the Buyer shall indemnify MCITC
                against each loss liability and cost arising out of such claims.
                <br />
                10.3.7 MCITC shall be under no liability under the above
                warranty (or any other warranty condition or guarantee) if the
                total price for the Goods has not been paid in cleared funds by
                the due date for payment.
                <br />
                10.3.8 MCITC shall be under no liability whatsoever in respect
                of any defect in the Goods arising after the expiry of the
                Warranty Period.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.4 Where there is any defect in the quality or condition of
                the Goods or where the Goods fail to correspond with
                specification, Buyer may apply to return the defective and/or
                damaged Goods to MCITC or Seller in exchange for a replacement
                or a refund in accordance with MCITC’s Return Policy and Clause
                7 of these Conditions above.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.5 As an alternative to returning faulty or damaged Goods in
                exchange for refund or replacement under Clause 7 of these
                Conditions above, a Buyer may request for a repair of such
                Goods. MCITC and Seller however is entitled to accept or reject
                such request, at its own discretion. Such request shall be
                irrevocable upon MCITC’s or Seller’s acceptance of the same and
                the non-conforming Goods (or part thereof) will be repaired as
                originally ordered. The Buyer may not later elect for a return
                under Clause 7 of these Conditions above once MCITC or Seller
                has accepted such request.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.6 Where the Goods have not been repaired within a reasonable
                time, despite a written warning from the Buyer, the Buyer shall
                be entitled to a reduction of the price in proportion to the
                reduced value of the Goods, provided that under no circumstance
                shall such reduction exceed 15% of the price of the affected
                Goods. In lieu of repair, MCITC may, at its sole discretion,
                grant such a reduction to the Buyer. Upon a repair or price
                reduction being made as aforesaid, the Buyer shall have no
                further claim against the Seller.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                10.7 When MCITC or Seller has provided replacement Goods or
                given the Buyer a refund, the non-conforming Goods or parts
                thereof shall become property of MCITC or Seller.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>11 Liability</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                11.1 In no event shall MCITC be liable for loss of profit or
                goodwill, loss of production or revenue or any type of special
                indirect or consequential loss whatsoever (including loss or
                damage suffered by the Buyer as a result of an action brought by
                a third party) even if such loss were reasonably foreseeable or
                if MCITC had been advised by the Buyer of the possibility of
                incurring the same.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                11.2 The remedies set out in Clause 10 of these Conditions are
                the Buyer’s sole and exclusive remedies for non-conformity of or
                defects in the Goods and MCITC’s liability for the same shall be
                limited in the manner specified in Clause 10 of these Conditions
                .
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                11.3 Notwithstanding any other provision of these Conditions,
                Seller’s maximum cumulative liability to you or to any other
                party for all losses under, arising out of or relating to the
                sale of products under each Contract, shall not exceed the sums
                that you have paid to Seller under such Contract.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                11.4 If a number of events give rise substantially to the same
                loss they shall be regarded as giving rise to only one claim
                under these Conditions.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                11.5 No action shall be brought against MCITC later than 12
                months after the date it became aware of the circumstances
                giving rise to a claim or the date when it ought reasonably to
                have become aware, and in any event, no later than 12 months
                after the end of the Warranty Period.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>12 AMENDMENTS</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                We may amend these Terms and Conditions any time by posting an
                updated version at https://www.mcitc.my/terms-of-use/ . The
                updated version of these Terms and Conditions shall take effect
                21 days from the posting date. Each time you use your MCITC
                Account you confirm that you agree to be bound by these Terms
                and Conditions as may be amended from time to time.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }}>13 REPRESENTATIONS AND WARRANTIES</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                By accepting these Terms and Conditions, you represent and
                warrant that you are at least 18 years of age and not violating
                any applicable laws or regulations through your use of your
                MCITC Account, and you agree to defend, indemnify and hold us,
                our Indemnitees, affiliates and authorized representatives
                harmless from any claim, demand (including legal fees and
                costs), fines, penalties or other liability incurred by us due
                to or arising out of your breach of this representation and
                warranty. We may report any suspicious activity to the relevant
                authorities.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2, fontWeight: 600 }} >14 RESTRICTED ACTIVITIES</Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                14.1 In connection with your use of your MCITC Account, you
                shall not:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                14.1.1 Provide false, inaccurate or misleading information;
                <br />
                14.1.2 Use your MCITC for any illegal activities;
                <br />
                14.1.3 Use your MCITC in a manner that may result in complaints,
                disputes, claims, penalties or other liability to us, other
                users or third parties or may be regarded as an abuse of the
                card system or a violation of card association or network rules;
                or
                <br />
                14.1.4 Breach these Terms and Conditions and/or the Privacy
                Policy or violate any applicable laws and regulations.
              </Typography>
              <Typography variant="subtitle1" style={{}}>
                14.2 If we, in our sole discretion, believe that you may have
                engaged in the above restricted activities, we may take various
                actions, including the following:
              </Typography>
              <Typography variant="subtitle2" style={{ lineHeight: 2, marginTop: 0 }}>
                14.2.1 We may suspend or restrict your access to and/or close
                your MCITC Account;
                <br />
                14.2.2 We may terminate these Terms and Conditions and refuse to
                provide the services to you;
                <br />
                14.2.3 We may place a hold on your MCITC Account Balance for up
                to 180 days if reasonably needed to protect against the risk of
                liability; or
                <br />
                14.2.4 We may take legal action against you.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                14.3 If you are below 18 years old you must obtain consent from
                your parent(s) or legal guardian(s). By consenting to your
                acceptance of these Terms and Conditions, your parent(s) or
                legal guardian(s) are agreeing to take responsibility for: (i)
                your actions in your use of the MCITC Account; (ii) any charges
                associated with your use of any of the MCITC Account; and (iii)
                your compliance with these Terms and Conditions. If you do not
                have consent from your parent(s) or legal guardian(s), you must
                cease using the MCITC Account.
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
                For information about how to contact us, please visit our
                <Link to="/site/contact-us" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'blue' }}> contact page</Link>.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageTerms;
