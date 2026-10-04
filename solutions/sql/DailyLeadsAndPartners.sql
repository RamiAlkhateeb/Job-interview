/*
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| date_id     | date    |
| make_name   | varchar |
| lead_id     | int     |
| partner_id  | int     |
+-------------+---------+
This table does not have a primary key.
This table contains the date and the name of the product sold and the IDs of the lead and partner it was sold to.
The name consists of only lowercase English letters.
*/
select date_id, make_name , count(DISTINCT lead_id) as unique_leads , count(DISTINCT partner_id) as unique_partners from DailySales group by date_id, make_name