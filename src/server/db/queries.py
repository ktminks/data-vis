
poverty_query = '''
    SELECT year, COUNT(countryID) as count
    FROM (
        SELECT p1.year, p1.countryID
        FROM PovertyAndIncome p1
        JOIN (
            SELECT year, AVG(povertyGap) as global_avg
            FROM PovertyAndIncome
            GROUP BY year
        ) p2 ON p1.year = p2.year
        WHERE p1.povertyGap > p2.global_avg * 1.2
    )
    GROUP BY year
    ORDER BY year
'''
poverty_query_map = '''
SELECT p1.year, p1.global_avg, p2.povertyGap, c.countryName
FROM (
    SELECT p.year, AVG(p.povertyGap) as global_avg
    FROM PovertyAndIncome p
    GROUP BY p.year
) p1
JOIN (
    SELECT year, povertyGap, countryID
    FROM PovertyAndIncome
) p2 ON p1.year = p2.year
JOIN (
    SELECT countryID, countryName
    FROM Country
) c ON p2.countryID = c.countryID
ORDER BY p1.year
'''
