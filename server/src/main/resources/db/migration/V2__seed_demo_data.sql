-- Password hash for 'password123'
INSERT INTO users (id, full_name, email, password_hash, role, enabled, created_at, updated_at)
VALUES (
    'u-owner-001',
    'Amina Alami',
    'owner@salonamina.ma',
    '$2a$10$4y9pA70hQ4F.QYv5o6O.y.5Q41KkWFhXJ9qZgH4.eK3xXyZ4vF2uG',
    'OWNER',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO businesses (
    id, owner_user_id, name, slug, category, description, phone, city, address,
    timezone, currency, preferred_language, published, advance_notice_hours,
    booking_horizon_days, created_at, updated_at
) VALUES (
    'b-salon-amina-001',
    'u-owner-001',
    'Salon Amina',
    'salon-amina',
    'hair_salon',
    'Votre havre de beauté et de bien-être au cœur de Fès. Coiffure moderne, soins du visage et rituels esthétiques.',
    '+212 535-620000',
    'Fès',
    '12 Boulevard Hassan II, Ville Nouvelle, Fès',
    'Africa/Casablanca',
    'MAD',
    'fr',
    TRUE,
    2,
    30,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO business_branding (
    id, business_id, logo_url, cover_url, primary_color, theme_key,
    welcome_message, created_at, updated_at
) VALUES (
    'br-salon-amina-001',
    'b-salon-amina-001',
    NULL,
    NULL,
    '#0d9488',
    'emerald',
    'Prenez rendez-vous en quelques clics pour vos soins coiffure et beauté.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO services (id, business_id, name, description, price_mad, duration_minutes, buffer_minutes, image_url, active, created_at, updated_at)
VALUES
(
    'srv-001',
    'b-salon-amina-001',
    'Coupe & Brushing Femme',
    'Shampoing traitant, coupe sur mesure personnalisée et brushing soigné.',
    150.00,
    45,
    15,
    NULL,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'srv-002',
    'b-salon-amina-001',
    'Soin de Visage Éclat',
    'Nettoyage en profondeur, gommage doux et masque régénérant aux huiles marocaines.',
    250.00,
    60,
    15,
    NULL,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'srv-003',
    'b-salon-amina-001',
    'Manucure & Pédicure Spa',
    'Beauté complète des ongles, gommage et massage hydratant.',
    180.00,
    60,
    0,
    NULL,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO staff (id, business_id, display_name, email, phone, avatar_url, active, created_at, updated_at)
VALUES
(
    'stf-001',
    'b-salon-amina-001',
    'Amina (Fondatrice & Styliste)',
    'amina@salonamina.ma',
    '+212 661-112233',
    NULL,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'stf-002',
    'b-salon-amina-001',
    'Karim (Coiffeur Coloriste)',
    'karim@salonamina.ma',
    '+212 662-445566',
    NULL,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO staff_services (id, staff_id, service_id)
VALUES
('ss-001', 'stf-001', 'srv-001'),
('ss-002', 'stf-001', 'srv-002'),
('ss-003', 'stf-001', 'srv-003'),
('ss-004', 'stf-002', 'srv-001');

-- Working hours: Mon - Sat: 09:00 - 19:00, Sun: Closed
INSERT INTO working_hours (id, business_id, staff_id, weekday, start_time, end_time, closed, created_at, updated_at)
VALUES
('wh-001', 'b-salon-amina-001', NULL, 1, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-002', 'b-salon-amina-001', NULL, 2, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-003', 'b-salon-amina-001', NULL, 3, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-004', 'b-salon-amina-001', NULL, 4, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-005', 'b-salon-amina-001', NULL, 5, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-006', 'b-salon-amina-001', NULL, 6, '09:00:00', '19:00:00', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('wh-007', 'b-salon-amina-001', NULL, 7, '09:00:00', '19:00:00', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO customers (id, business_id, full_name, email, phone, created_at)
VALUES (
    'cust-001',
    'b-salon-amina-001',
    'Fatima Zahra Benjelloun',
    'fatima.z@example.ma',
    '+212 670-123456',
    CURRENT_TIMESTAMP
);

INSERT INTO appointments (
    id, business_id, customer_id, service_id, staff_id,
    service_name_snapshot, duration_minutes_snapshot, price_mad_snapshot,
    starts_at, ends_at, status, booking_reference, customer_note, cancellation_reason,
    created_at, updated_at
) VALUES (
    'app-demo-001',
    'b-salon-amina-001',
    'cust-001',
    'srv-001',
    'stf-001',
    'Coupe & Brushing Femme',
    45,
    150.00,
    -- Future slot
    TIMESTAMP '2026-10-15 10:00:00',
    TIMESTAMP '2026-10-15 11:00:00',
    'CONFIRMED',
    'BK-AMINA77',
    'Cheveux mi-longs, premier rendez-vous.',
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
