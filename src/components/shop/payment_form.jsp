<%@ page contentType="text/html;charset=UTF-8" language="java" %>

    <%@ page import="java.text.SimpleDateFormat" %>
        <%@ page import="java.util.Date" %>
            <%@ page import="java.util.TimeZone" %>
                <%@ page import="java.util.UUID" %>
                    <html>

                    <head>
                        <title>Secure Acceptance - Payment Form Example</title>
                        <link rel="stylesheet" type="text/css" href="payment.css" />
                        <script type="text/javascript" src="jquery-1.7.min.js"></script>
                    </head>

                    <body>
                        <form id="payment_form" action="payment_confirmation.jsp" method="post">
                            <input type="hidden" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7">
                            <input type="hidden" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0">

                            <input type="hidden" name="transaction_uuid" value="<%= UUID.randomUUID() %>">
                            <input type="hidden" name="signed_field_names"
                                value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency">
                            <input type="hidden" name="unsigned_field_names">
                            <input type="hidden" name="signed_date_time" value="<%= getUTCDateTime() %>">
                            <input type="hidden" name="locale" value="en">
                            <fieldset>
                                <legend>Payment Details</legend>
                                <div id="paymentDetailsSection" class="section">
                                    <span>transaction_type:</span><input type="text" name="transaction_type"
                                        size="25"><br />
                                    <span>reference_number:</span><input type="text" name="reference_number"
                                        size="25"><br />
                                    <span>amount:</span><input type="text" name="amount" size="25"><br />
                                    <span>currency:</span><input type="text" name="currency" size="25"><br />
                                </div>
                            </fieldset>
                            <input type="submit" id="submit" name="submit" value="Submit" />
                            <script type="text/javascript" src="payment_form.js"></script>
                        </form>
                    </body>

                    </html>
                    <%! private String getUTCDateTime() { SimpleDateFormat sdf=new
                        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"); sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
                        return sdf.format(new Date()); } %>