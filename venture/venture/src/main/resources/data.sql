-- Insert data into VC table
INSERT INTO vc (id, name) VALUES (1, 'VC Firm 1');
INSERT INTO vc (id, name) VALUES (2, 'VC Firm 2');

-- Insert data into Fund table
INSERT INTO fund (id, fund_name, vc_id) VALUES (1, 'Fund 1', 1);
INSERT INTO fund (id, fund_name, vc_id) VALUES (2, 'Fund 2', 2);

-- Insert data into LP table
INSERT INTO lp (id, name) VALUES (1, 'LP 1');
INSERT INTO lp (id, name) VALUES (2, 'LP 2');

-- Insert data into the join table for the many-to-many relationship between Fund and LP
INSERT INTO fund_lp (fund_id, lp_id) VALUES (1, 1);
INSERT INTO fund_lp (fund_id, lp_id) VALUES (2, 2);