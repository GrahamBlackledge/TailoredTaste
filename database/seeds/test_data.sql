WITH new_customer AS (
    INSERT INTO customer (full_name, email, phone)
    VALUES (
        'Dylan Blackledge',
        'dylanb@example.com',
        '213423552'
    )
    RETURNING customer_id
)

INSERT INTO enquiry (
    customer_id,
    event_date,
    guest_count,
    event_location,
    dietary_notes
)
SELECT
    customer_id,
    '2026-12-20',
    15,
    'Auckland',
    'Two guests'
FROM new_customer;