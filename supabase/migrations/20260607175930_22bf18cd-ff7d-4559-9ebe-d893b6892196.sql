
-- Allow owners to update/delete their own asset request items
CREATE POLICY "Users can update own asset request items"
ON public.asset_request_items FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.asset_requests WHERE asset_requests.id = asset_request_items.request_id AND asset_requests.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.asset_requests WHERE asset_requests.id = asset_request_items.request_id AND asset_requests.user_id = auth.uid()));

CREATE POLICY "Users can delete own asset request items"
ON public.asset_request_items FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.asset_requests WHERE asset_requests.id = asset_request_items.request_id AND asset_requests.user_id = auth.uid()));

-- Admins can view all asset specifications
CREATE POLICY "Admins can view all asset specifications"
ON public.asset_specifications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can view all contact messages (including anonymous ones)
CREATE POLICY "Admins can view all contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
