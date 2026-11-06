--
-- PostgreSQL database dump
--

\restrict Oya8cwfpdLFMseaUfvAOXgm44iDtvchLzQATAxt2idVyMeOuFE8eRXmPyHr48wf

-- Dumped from database version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_user (
    admin_user_id bigint NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'staff'::character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_admin_role CHECK (((role)::text = ANY ((ARRAY['owner'::character varying, 'staff'::character varying])::text[])))
);


--
-- Name: admin_user_admin_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.admin_user ALTER COLUMN admin_user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admin_user_admin_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: booking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.booking (
    booking_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    enquiry_id bigint,
    package_id bigint,
    event_date date NOT NULL,
    guest_count integer NOT NULL,
    event_location character varying(255),
    status character varying(30) DEFAULT 'confirmed'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_booking_guests CHECK ((guest_count > 0)),
    CONSTRAINT chk_booking_status CHECK (((status)::text = ANY ((ARRAY['confirmed'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: booking_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.booking ALTER COLUMN booking_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.booking_booking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer (
    customer_id bigint NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(30),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.customer ALTER COLUMN customer_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: enquiry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enquiry (
    enquiry_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    event_date date NOT NULL,
    guest_count integer NOT NULL,
    event_location character varying(255),
    dietary_notes text,
    status character varying(30) DEFAULT 'new'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_guest_count CHECK ((guest_count > 0))
);


--
-- Name: enquiry_enquiry_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.enquiry ALTER COLUMN enquiry_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.enquiry_enquiry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoice (
    invoice_id bigint NOT NULL,
    booking_id bigint NOT NULL,
    invoice_number character varying(30) NOT NULL,
    amount_total numeric(10,2) NOT NULL,
    status character varying(20) DEFAULT 'unpaid'::character varying NOT NULL,
    issue_date date DEFAULT CURRENT_DATE NOT NULL,
    due_date date,
    paid_date date,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_invoice_amount CHECK ((amount_total >= (0)::numeric)),
    CONSTRAINT chk_invoice_status CHECK (((status)::text = ANY ((ARRAY['unpaid'::character varying, 'paid'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: invoice_invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.invoice ALTER COLUMN invoice_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_invoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: menu_package; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_package (
    package_id bigint NOT NULL,
    package_name character varying(150) NOT NULL,
    description text,
    price_per_person numeric(10,2) NOT NULL,
    minimum_guests integer DEFAULT 1,
    is_active boolean DEFAULT true,
    CONSTRAINT chk_minimum_guests CHECK ((minimum_guests > 0)),
    CONSTRAINT chk_price CHECK ((price_per_person >= (0)::numeric))
);


--
-- Name: menu_package_package_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.menu_package ALTER COLUMN package_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.menu_package_package_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: quote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quote (
    quote_id bigint NOT NULL,
    enquiry_id bigint NOT NULL,
    version_number integer DEFAULT 1 NOT NULL,
    status character varying(30) DEFAULT 'draft'::character varying NOT NULL,
    valid_until date,
    notes text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT quote_status_check CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'sent'::character varying, 'accepted'::character varying, 'declined'::character varying, 'expired'::character varying])::text[]))),
    CONSTRAINT quote_version_number_check CHECK ((version_number > 0))
);


--
-- Name: quote_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quote_item (
    quote_item_id bigint NOT NULL,
    quote_id bigint NOT NULL,
    description character varying(255) NOT NULL,
    quantity numeric(10,2) NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    CONSTRAINT chk_quote_item_price CHECK ((unit_price >= (0)::numeric)),
    CONSTRAINT chk_quote_item_quantity CHECK ((quantity > (0)::numeric))
);


--
-- Name: quote_item_quote_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.quote_item ALTER COLUMN quote_item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.quote_item_quote_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: quote_quote_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.quote ALTER COLUMN quote_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.quote_quote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: admin_user admin_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_user
    ADD CONSTRAINT admin_user_email_key UNIQUE (email);


--
-- Name: admin_user admin_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_user
    ADD CONSTRAINT admin_user_pkey PRIMARY KEY (admin_user_id);


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (booking_id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: enquiry enquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enquiry
    ADD CONSTRAINT enquiry_pkey PRIMARY KEY (enquiry_id);


--
-- Name: invoice invoice_booking_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_booking_id_key UNIQUE (booking_id);


--
-- Name: invoice invoice_invoice_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_invoice_number_key UNIQUE (invoice_number);


--
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (invoice_id);


--
-- Name: menu_package menu_package_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_package
    ADD CONSTRAINT menu_package_pkey PRIMARY KEY (package_id);


--
-- Name: quote_item quote_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quote_item
    ADD CONSTRAINT quote_item_pkey PRIMARY KEY (quote_item_id);


--
-- Name: quote quote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_pkey PRIMARY KEY (quote_id);


--
-- Name: quote quote_version; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_version UNIQUE (enquiry_id, version_number);


--
-- Name: booking fk_booking_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fk_booking_customer FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: booking fk_booking_enquiry; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fk_booking_enquiry FOREIGN KEY (enquiry_id) REFERENCES public.enquiry(enquiry_id);


--
-- Name: booking fk_booking_package; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fk_booking_package FOREIGN KEY (package_id) REFERENCES public.menu_package(package_id);


--
-- Name: enquiry fk_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enquiry
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: invoice fk_invoice_booking; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT fk_invoice_booking FOREIGN KEY (booking_id) REFERENCES public.booking(booking_id);


--
-- Name: quote_item fk_quote_item_quote; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quote_item
    ADD CONSTRAINT fk_quote_item_quote FOREIGN KEY (quote_id) REFERENCES public.quote(quote_id);


--
-- Name: quote quote_enquiry_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_enquiry_id_fkey FOREIGN KEY (enquiry_id) REFERENCES public.enquiry(enquiry_id);


--
-- PostgreSQL database dump complete
--

\unrestrict Oya8cwfpdLFMseaUfvAOXgm44iDtvchLzQATAxt2idVyMeOuFE8eRXmPyHr48wf

